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
import {generateRandomValue} from '$core/utils/function/random/random.func';
import {getMessageChannel} from '$core/utils/discord';
import {resultify} from 'rustic-error';
import {msgParams} from '$core/utils/function/string';
import type {Snowflake} from 'discord-api-types/globals';

@Dev
export default class GuildMemberJoin extends Event<'guildMemberAdd'> {
	name = 'guildMemberAdd' as const;

	private welcomesMessageIndex = new Map<Snowflake, number>;

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

		const messageText = this.getWelcomeMessage(member.guild.id);

		if (!messageText) {
			logger.error('get undefined for welcome message text');
			logger.debugValues({
				messages: guildMemberJoinConfig.welcome.join(', ')
			});
			return;
		}

		const channelResult = await getMessageChannel(member.guild.id, config.channelId, 'welcome_message_1');
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

	getWelcomeMessage(guildId: Snowflake): string {
		const messages = guildMemberJoinConfig.welcome;

		let i = generateRandomValue(messages.length - 1);

		if (typeof this.welcomesMessageIndex.get(guildId) !== 'undefined' && this.welcomesMessageIndex.get(guildId) === i) {
			i = i === (messages.length - 1) ? 0 : i + 1;
		}

		this.welcomesMessageIndex.set(guildId, i);
		return messages[i];
	}
}