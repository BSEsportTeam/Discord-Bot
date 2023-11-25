import type {ButtonInteraction, InteractionEditReplyOptions, InteractionReplyOptions, Message} from 'discord.js';
import {ActionRowBuilder, ButtonBuilder, ComponentType, EmbedBuilder} from 'discord.js';
import {colors} from '$core/config/global/global.config';
import {messageConfig} from '$core/config/message';
import {ButtonError} from '$core/utils/error';
import type {Result} from 'rustic-error';
import {error, ok, resultify} from 'rustic-error';
import {logger} from '$core/utils/logger';

export const authorOnly = async (interaction: ButtonInteraction): Promise<boolean> => {
	if (interaction.message.interaction?.user.id === interaction.user.id || interaction.memberPermissions?.has('Administrator')) {
		return true;
	}

	const result = await resultify(() => interaction.reply({
		embeds: [new EmbedBuilder()
			.setTitle(messageConfig.button.authorOnly.title)
			.setDescription(messageConfig.button.authorOnly.description)
			.setColor(colors.notAllowed)],
		ephemeral: true,
	}));

	if (!result.ok) {
		logger.error(`failed to Reply to interaction, error : ${result.error.message}`);
	}

	return false;
};
export const disableButtons = async (message: Message) => {
	try {
		const newComponents = [];

		for (const componentRow of message.components) {

			if (componentRow.type !== ComponentType.ActionRow) {
				newComponents.push(componentRow);
				continue;
			}

			const newActionRow = new ActionRowBuilder<ButtonBuilder>();
			for (const component of componentRow.components) {
				if (component.type !== ComponentType.Button) continue;
				newActionRow.addComponents(new ButtonBuilder(component.data).setDisabled(true));
			}

			if (newActionRow.components.length === 0) {
				newComponents.push(componentRow);
				continue;
			}

			newComponents.push(newActionRow);
		}

		await message.edit({
			components: newComponents,
		});
	} catch (e) {
		logger.error(`failed to disable buttons, error : ${e instanceof Error ? e.message : String(e)}`);
	}
};

export const sendButtonReply = async (interaction: ButtonInteraction, options: InteractionReplyOptions | InteractionEditReplyOptions, defer: boolean):
	Promise<Result<boolean, ButtonError>> => {
	if (defer) {
		const result = await resultify(() => interaction.editReply(options as InteractionEditReplyOptions));

		if (!result.ok) {
			return error(new ButtonError('failed to reply to interaction', interaction, result.error));
		}

		return ok(true);
	}
	const result = await resultify(() => interaction.reply(options as InteractionReplyOptions));

	if (!result.ok) {
		return error(new ButtonError('failed to reply to interaction', interaction, result.error));
	}

	return ok(true);
};

export const interactionReplyError = (interaction: ButtonInteraction, error: Error) => new ButtonError(`failed to editReply to interaction, error : ${error.message}`, interaction, error);