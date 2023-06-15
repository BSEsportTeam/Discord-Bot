import type {ButtonHandler} from '$core/handlers/buttons/button.type';
import type {Result} from 'rustic-error';
import {error, ok, resultify} from 'rustic-error';
import type {ButtonInteraction} from 'discord.js';
import {ButtonError} from '$core/utils/error';
import {buttonsIds} from '$core/handlers/buttons/button.const';
import {isProd} from '$core/config/env';
import {guildsConfig} from '$core/config/guilds';
import {devConfig} from '$core/config/guilds/_dev/dev.config';
import {globalConfig} from '$core/config/global';
import {logger} from '$core/utils/logger';
import {isValidChannel} from '$core/handlers/buttons/announce_event/annouce_event.util';
import {msgParams} from '$core/utils/function/string';
import {commandsConfig} from '$core/config/message/command';
import {interactionReplyError} from '$core/handlers/buttons';
import {errorEmbed, successEmbed} from '$core/utils/discord/embet';

export const confirm: ButtonHandler = {

	name: 'AnnounceEventConfirm',
	id: buttonsIds.eventAnnouncements.confirm,
	autoDisable: true,
	preReply: true,

	async run(interaction: ButtonInteraction): Promise<Result<boolean, ButtonError>> {

		let numberGuildSend = 0;
		const fails: string[] = [];

		for (const guildConfig of Object.values(isProd ? guildsConfig : devConfig.guilds)) {
			if (!guildConfig.eventAnnouncements.enable) {
				continue;
			}

			const guildResult = await resultify(() => interaction.client.guilds.fetch(guildConfig.guildId));

			if (!guildResult.ok) {
				if (numberGuildSend === 0) {
					return error(new ButtonError(
						`failed to fetch guild ${guildConfig.name} (${guildConfig.guildId}), error : ${guildResult.error.message}`,
						interaction,
						guildResult.error));
				}

				fails.push(guildConfig.name);
				logger.warning(`[${confirm.name}] failed to fetch guild ${guildConfig.name} (${guildConfig.guildId}), error : ${guildResult.error.message}`);
				continue;
			}

			const guild = guildResult.value;

			const channelResult = await resultify(() => guild.channels.fetch(guildConfig.eventAnnouncements.channelId));

			if (!channelResult.ok) {
				if (numberGuildSend === 0) {
					return error(new ButtonError(
						`failed to fetch channel for guild ${guildConfig.name} (${guildConfig.guildId}),` +
						`channelId : ${guildConfig.eventAnnouncements.channelId}, error : ${channelResult.error.message}`,
						interaction,
						channelResult.error));
				}

				fails.push(guildConfig.name);
				logger.warning(`[${confirm.name}] failed to fetch channel for guild ${guildConfig.name} (${guildConfig.guildId}),` +
						`channelId : ${guildConfig.eventAnnouncements.channelId}, error : ${channelResult.error.message}`);
				continue;
			}

			const channel = channelResult.value;

			if (channel === null || !isValidChannel(channel)) {
				if (numberGuildSend === 0) {
					return error(new ButtonError(
						`invalid channel in config for guild ${guildConfig.name} (${guildConfig.guildId}), ` +
						`channel id : ${guildConfig.eventAnnouncements.channelId}`,
						interaction
					));
				}

				fails.push(guildConfig.name);
				logger.warning(`[${confirm.name}] invalid channel in config for guild ${guildConfig.name} (${guildConfig.guildId}), ` +
					`channel id : ${guildConfig.eventAnnouncements.channelId}`);
				continue;
			}


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
				logger.warning(`[${confirm.name}] failed to send message in guild ${guildConfig.name} (${guildConfig.guildId}), ` +
						`channel ${channel.name} (${channel.id}), error : ${messageResult.error.message}`);
				continue;
			}

			for (const emoji of globalConfig.eventAnnouncementEmojis) {
				const result = await resultify(() => messageResult.value.react(emoji));
				if (!result.ok) {
					logger.warning(`${confirm.name} failed to add reaction ${emoji} in guild ${guildConfig.name}`);
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

 