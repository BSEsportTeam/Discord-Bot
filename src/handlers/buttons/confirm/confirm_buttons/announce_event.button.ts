import {interactionReplyError} from '$core/handlers/buttons';
import type {ButtonInteraction} from 'discord.js';
import type {Result} from 'rustic-error';
import {error, ok, resultify} from 'rustic-error';
import {ButtonError} from '$core/utils/error';
import {isProd} from '$core/config/env';
import {guildsConfig} from '$core/config/guilds';
import {devConfig} from '$core/config/guilds/_dev/dev.config';
import {errorEmbed, getMessageChannel, successEmbed} from '$core/utils/discord';
import {logger} from '$core/utils/logger';
import {globalConfig} from '$core/config/global';
import {msgParams} from '$core/utils/function/string';
import {commandsConfig} from '$core/config/message/command';
import type {ConfirmButtonHandler} from '$core/handlers/buttons/confirm';

export const announceEvent: ConfirmButtonHandler = {

	name: 'AnnounceEventConfirm',
	autoDisable: true,
	preReply: true,
	cancel: null,
	async confirm(interaction: ButtonInteraction): Promise<Result<boolean, ButtonError>> {

		let numberGuildSend = 0;
		const fails: string[] = [];

		for (const guildConfig of Object.values(isProd ? guildsConfig : devConfig.guilds)) {
			if (!guildConfig.eventAnnouncements.enable) {
				continue;
			}

			const channelResult = await getMessageChannel(guildConfig.guildId, guildConfig.eventAnnouncements.channelId, 'announce event send');

			if (!channelResult.ok) {
				if (numberGuildSend === 0) {
					return error(new ButtonError(
						channelResult.error.message, interaction));
				}

				fails.push(guildConfig.name);
				logger.warning(`[${announceEvent.name}] ${channelResult.error.message}`);
				continue;
			}

			const channel = channelResult.value;

			const messageResult = await resultify(() => channel.send({
				content: interaction.message.content.replaceAll(isProd ?
					guildsConfig.global.eventAnnouncements.roleId :
					devConfig.guilds.guildSection.eventAnnouncements.roleId, guildConfig.eventAnnouncements.roleId),
				files: interaction.message.attachments.toJSON()
			}));

			if (!messageResult.ok) {
				if (numberGuildSend === 0) {
					return error(new ButtonError(
						`failed to send message in guild ${guildConfig.name} (${guildConfig.guildId}), ` +
						`channel ${channel.name} (${channel.id}), error : ${messageResult.error.message}`,
						interaction,
						messageResult.error
					));
				}

				fails.push(guildConfig.name);
				logger.warning(`[${announceEvent.name}] failed to send message in guild ${guildConfig.name} (${guildConfig.guildId}), ` +
					`channel ${channel.name} (${channel.id}), error : ${messageResult.error.message}`);
				continue;
			}

			for (const emoji of globalConfig.eventAnnouncementEmojis) {
				const result = await resultify(() => messageResult.value.react(emoji));
				if (!result.ok) {
					logger.warning(`${announceEvent.name} failed to add reaction ${emoji} in guild ${guildConfig.name}`);
				}
			}

			numberGuildSend++;
		}

		if (fails.length === 0) {
			const result = await resultify(() => interaction.editReply({
				embeds: [successEmbed(msgParams(
					commandsConfig.announceEvent.exec.button.success,
					[numberGuildSend]))]
			}));

			if (result.ok) {
				return ok(true);
			}

			return error(interactionReplyError(interaction, result.error));
		}

		const result = await resultify(() => interaction.editReply({
			embeds: [errorEmbed(msgParams(
				commandsConfig.announceEvent.exec.button.failed,
				[fails.join('\n- ')]))]
		}));

		if (result.ok) {
			return ok(true);
		}

		return error(interactionReplyError(interaction, result.error));

	}
};