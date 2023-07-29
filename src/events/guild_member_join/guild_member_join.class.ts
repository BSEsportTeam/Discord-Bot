import {Event} from '$core/handlers/events';
import type {GuildMember} from 'discord.js';
import {Dev} from '$core/utils/dev';
import {getGuildXp} from '$core/handlers/database/xp';
import {logger} from '$core/utils/logger';
import {checkXpRoles} from '$core/utils/xp/xp.func';
import {calculateLevel} from '$core/utils/xp';
import {isDev} from '$core/config/env';
import {getDevGuildWithId, getGuildWithId} from '$core/config/guilds';
import {guildMemberJoinConfig} from '$core/config/message';
import {getRandomValueFromArray} from '$core/utils/function/random/random.func';
import {getMessageChannel} from '$core/utils/discord';
import {resultify} from 'rustic-error';
import {msgParams} from '$core/utils/function/string';

@Dev
export default class GuildMemberJoin extends Event<'guildMemberAdd'> {
	name = 'guildMemberAdd' as const;

	async run(member: GuildMember) {

		void this.sendWelcomeMessage(member);

		const xpInfos = await getGuildXp(member.user.id, member.guild.id);
		if (!xpInfos.ok) {
			logger.error(`failed to get xp infos about member, error : ${xpInfos.error}`);
			logger.debugValues(xpInfos.error.debug());
		}

		if (xpInfos.ok && xpInfos.value !== null) {
			void checkXpRoles(
				member.user.id,
				member.guild.id,
				0,
				calculateLevel(xpInfos.value),
				false
			);
		}

	}

	async sendWelcomeMessage(member: GuildMember) {
		const config = (isDev ? getDevGuildWithId(member.guild.id) : getGuildWithId(member.guild.id))?.pubMessages;
		if (!config) {
			return;
		}

		const messages = guildMemberJoinConfig.welcome;
		const messageText = getRandomValueFromArray(messages);

		if (!messageText) {
			logger.error('get undefined for welcome message text');
			logger.debugValues({
				messages: messages.join(', ')
			});
			return;
		}

		const channelResult = await getMessageChannel(member.guild.id, config.channelId);
		if (!channelResult.ok) {
			logger.error(channelResult.error.message);
			return;
		}

		const result = await resultify(() => channelResult.value.send({
			content: msgParams(messageText, [member.toString()]),
			allowedMentions: {
				users: []
			}
		}));

		if (!result.ok) {
			logger.error(`failed to send welcome message, error : ${result.error.message}`);
		}

	}
}