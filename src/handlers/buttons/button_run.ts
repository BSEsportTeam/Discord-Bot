import type {ButtonInteraction} from 'discord.js';
import {buttonsIds, DYNAMIC_ID, DYNAMIC_ID_SEPARATOR} from '$core/handlers/buttons/button.const';
import {client} from '$core/index';
import {authorOnly, disableButtons} from '$core/handlers/buttons/button.util';
import {resultify} from 'rustic-error';
import {logger} from '$core/utils/logger';
import {replyError} from '$core/utils/discord/other/interaction';
import {effect, effectReset, forground256Color} from 'tintify';
import type {ButtonHandler} from '$core/handlers/buttons/button.type';
import {getConfirmHandler} from '$core/handlers/buttons/confirm';

export const handleButton = async (interaction: ButtonInteraction) => {
	let id = interaction.customId;

	if (id.startsWith(DYNAMIC_ID)) {
		id = id.split(DYNAMIC_ID_SEPARATOR)[0];
	}

	let handler: ButtonHandler | undefined;

	if (id === buttonsIds.confirm.confirm || id === buttonsIds.confirm.cancel) {
		handler = getConfirmHandler(interaction.customId);
	} else {
		handler = client.buttons.get(id);
	}

	if (!handler) {
		return;
	}

	if (handler.guildOnly && !interaction.inGuild()) {
		return;
	}

	if (handler.authorOnly) {
		const result = await authorOnly(interaction);

		if (!result) {
			return;
		}
	}

	if (handler.preReply) {
		const ephemeral = handler.ephemeral || false;
		const result = await resultify(() => interaction.deferReply({
			ephemeral,
		}));

		if (!result.ok) {
			logger.error(`failed to defer reply, error : ${result.error.message}`);
			return;
		}
	}

	if (handler.autoDisable) {
		await disableButtons(interaction.message);
	}

	const result = await handler.run(interaction);

	if (!result.ok) {
		logger.error(`Error with command ${effect.bold + handler.name + effectReset.bold} : ${forground256Color(202)}${result.error.message}`, result.error.debug());

		await replyError(interaction, handler.ephemeral || false, handler.preReply || false);
	}
};