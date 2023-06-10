import {confirm} from './announce_event_confirm.button';
import type {ButtonHandler} from '$core/handlers/buttons';
import {buttonsIds, interactionReplyError} from '$core/handlers/buttons';
import type {ButtonInteraction} from 'discord.js';
import type {ButtonError} from '$core/utils/error';
import type {Result} from 'rustic-error';
import {error, ok, resultify} from 'rustic-error';
import {commandsConfig} from '$core/config/message/command';
import {successEmbed} from '$core/utils/discord/embet';

const cancel: ButtonHandler = {
	name: 'announceEventHandler',
	id: buttonsIds.eventAnnouncements.cancel,
	autoDisable: true,
	
	async run(interaction: ButtonInteraction): Promise<Result<boolean, ButtonError>> {
		const result = await resultify(() => interaction.reply({embeds: [successEmbed(commandsConfig.annonceevent.exec.button.cancel)]}));

		if (result.ok) {
			return ok(true);
		}

		return error(interactionReplyError(interaction, result.error));
	}
};

export default [
	confirm,
	cancel
];