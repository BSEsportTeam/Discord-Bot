import {Event} from '$core/handlers/events';
import {Dev} from '$core/utils/dev';
import type {Message} from 'discord.js';
import {userMention} from 'discord.js';
import {cooldownCollection} from './message_create.util';
import {getDevGuildWithId, getGuildWithId} from '$core/config/guilds';
import {
	addXp,
	BOOSTER_MULTIPLIER,
	COOLDOWN_IN_SECONDS,
	LONG_MESSAGE_MIN_LENGTH,
	LONG_MESSAGE_MULTIPLIER,
	MAX_XP_PER_MESSAGE,
	MIN_XP_PER_MESSAGE,
	XP_BOOST_MULTIPLIER
} from '$core/utils/xp';
import {logger} from '$core/utils/logger';
import {isDebuggableError} from '$core/utils/error';
import {isDev} from '$core/config/env';
import {globalConfig} from '$core/config/global';
import {resultify} from 'rustic-error';
import {createBump, getBumpsByUserInGuildToday} from '$core/handlers/database/bump/bump.func';
import {simpleEmbed} from '$core/utils/discord';
import {msgParams} from '$core/utils/function/string';
import {messageCreateConfig} from '$core/config/message/event/message_create.config';

@Dev
export default class MessageCreate extends Event<'messageCreate'> {
	name = 'messageCreate' as const;

	async run(message: Message): Promise<void> {
		//check xp
		void this.checkXP(message);
		void this.checkBump(message);
	}

	async checkXP(message: Message) {
		if (message.author.bot) {
			return;
		}

		if (message.guild === null || message.guildId === null || !message.inGuild() || message.member === null) {
			return;
		}


		//check xp
		const xpConfig = isDev ? getDevGuildWithId(message.guildId) : getGuildWithId(message.guildId);
		if (xpConfig === null || !xpConfig.xp.enable) {
			return;
		}


		if (xpConfig.xp.disablesChannels.includes(message.channelId)) {
			return;
		}

		const cooldown = cooldownCollection.get(`${message.guildId}.${message.author.id}`);

		if (typeof cooldown !== 'undefined' && cooldown > message.createdTimestamp) {
			return;
		}

		let xpCount = Math.floor(Math.random() * (MAX_XP_PER_MESSAGE - MIN_XP_PER_MESSAGE + 1))+MIN_XP_PER_MESSAGE;

		if (message.member.roles.cache.has(xpConfig.xp.xpBoostRole)) {
			xpCount *= XP_BOOST_MULTIPLIER;

		} else if (message.member.roles.cache.has(xpConfig.xp.boosterRole)) {
			xpCount *= BOOSTER_MULTIPLIER;
		}

		if (message.content.length >= LONG_MESSAGE_MIN_LENGTH) {
			xpCount *= LONG_MESSAGE_MULTIPLIER;
		}

		const result = await addXp(message.member.id, message.guildId, xpCount);

		if (!result.ok) {
			logger.error(`failed to add xp after message, error : ${result.error.message}`, isDebuggableError(result.error) ? result.error.debug() : undefined);
			return;
		}

		cooldownCollection.set(`${message.guildId}.${message.author.id}`, message.createdTimestamp + (COOLDOWN_IN_SECONDS * 1000));
	}

	async checkBump(message: Message) {
		if (!message.guildId || !message.guild) {
			return;
		}
		const guildId = message.guildId;

		if (!message.author.bot) {
			return;
		}

		const botId = isDev ? '742097999198683176' : globalConfig.bumpBot;
		if (message.author.id !== botId) {
			return;
		}

		const bumpChannel = (isDev ? getDevGuildWithId(guildId) : getGuildWithId(guildId))?.bumpChannel || '';
		if (message.channelId !== bumpChannel) {
			return;
		}

		const messageResult = await resultify(() => message.fetch());
		if (!messageResult.ok) {
			logger.error('failed to fetch message for bump check');
			return;
		}
		if (!messageResult.value.interaction || messageResult.value.interaction.commandName !== globalConfig.bumpCommand) {
			return;
		}

		const authorId = messageResult.value.interaction.user.id;
		const bumpResult = await getBumpsByUserInGuildToday(authorId, guildId);
		if (!bumpResult.ok) {
			logger.error(`failed to fetch bumps of user, error : ${bumpResult.error.message}`, bumpResult.error.debug());
			return;
		}

		const create = async () => {
			const bumpCreate = await createBump({
				userId: authorId,
				guildId: guildId
			});
			if (!bumpCreate.ok) {
				logger.error(`failed to create bump to database, error : ${bumpCreate.error.message}`, bumpCreate.error.debug());
			}
		};
		void create();

		const replyResult = await resultify(() => message.reply({
			embeds: [
				simpleEmbed(msgParams(messageCreateConfig.bump.description, [
					userMention(authorId),
					bumpResult.value.length + 1,
					globalConfig.maxBump,
					globalConfig.maxBump > bumpResult.value.length ? globalConfig.xpPerBump : 0
				]), messageCreateConfig.bump.title)
			]
		}));
		if (!replyResult.ok) {
			logger.error(`failed to send thx message for bump, error : ${replyResult.error.message}`);
		}

		if (globalConfig.maxBump <= bumpResult.value.length) {
			return;
		}
		void addXp(authorId, guildId, globalConfig.xpPerBump);
	}
}