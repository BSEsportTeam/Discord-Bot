import {interactionReplyError} from '$core/handlers/buttons';
import type {ButtonInteraction} from 'discord.js';
import type {Result} from 'rustic-error';
import {error, ok, resultify} from 'rustic-error';
import type {ButtonError} from '$core/utils/error';
import {successEmbed} from '$core/utils/discord';
import {messageConfig} from '$core/config/message';

export const cancel = {
	async run(interaction: ButtonInteraction, ephemeral: boolean): Promise<Result<boolean, ButtonError>> {
		const result = await resultify(() => interaction.reply({
			embeds: [successEmbed(messageConfig.button.confirmSystem.cancelMessage)],
			ephemeral
		}));
		if (result.ok) {
			return ok(true);
		}
		return error(interactionReplyError(interaction, result.error));
	}
};