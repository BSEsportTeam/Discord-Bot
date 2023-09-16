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
import {addMessageSinceLastPub} from '$core/tasks/update_db_values/values/message_since_last_pub.util';
import type {BumpType} from '@prisma/client';
import {
	DISBOARD_BUMP_XP,
	DTOP_BOOST_XP,
	DTOP_BUMP_XP,
	MAX_BUMP_XP
} from '$core/events/message_create/message_create.const';

@Dev
export default class MessageCreate extends Event<'messageCreate'> {
	name = 'messageCreate' as const;

	async run(message: Message): Promise<void> {
		if (!message.guildId || !message.inGuild()) {
			return;
		}
		//check xp
		void this.checkXP(message);
		void this.checkBump(message);

		if (!message.author.bot && message.guildId) {
			const config = (isDev ? getDevGuildWithId(message.guildId) : getGuildWithId(message.guildId))?.pubMessages;
			if (config && message.channelId === config.channelId) {
				addMessageSinceLastPub(message.guildId);
			}
		}
	}

	async checkXP(message: Message<true>) {
		if (message.author.bot) {
			return;
		}

		if (message.member === null) {
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

	async checkBump(message: Message<true>) {
		const guildId = message.guildId;

		if (!message.author.bot) {
			return;
		}

		const bumpChannel = (isDev ? getDevGuildWithId(guildId) : getGuildWithId(guildId))?.bumpChannel || '';
		if (message.channelId !== bumpChannel) {
			return;
		}

		const messageResult = await resultify(() => message.fetch());
		if (!messageResult.ok) {
			logger.error(`failed to fetch message for bump check, error: ${messageResult.error.message}`);
			return;
		}

		const bumpType = this.getBumpType(messageResult.value);
		if (bumpType === null || messageResult.value.interaction === null) {
			return null;
		}


		const authorId = messageResult.value.interaction.user.id;
		const bumpResult = await getBumpsByUserInGuildToday(authorId, guildId);
		if (!bumpResult.ok) {
			logger.error(`failed to fetch bumps of user, error : ${bumpResult.error.message}`, bumpResult.error.debug());
			return;
		}

		let retry = false;
		const create = async (xp: number) => {
			const bumpCreate = await createBump({
				userId: authorId,
				guildId: guildId,
				type: bumpType,
				xp
			});
			if (!bumpCreate.ok) {
				if (bumpCreate.error.debug()['database error code'] === 'P2003') {
					retry = true;
				} else {
					logger.error(`failed to create bump to database, error : ${bumpCreate.error.message}`, bumpCreate.error.debug());
				}
			}
		};
		const currentDailyXp = bumpResult.value.map((b => b.xp)).reduce((sum, num) => sum + num, 0);
		let xpToAdd = this.getBumpXp(bumpType);

		if (currentDailyXp + xpToAdd > MAX_BUMP_XP) {
			xpToAdd = MAX_BUMP_XP - currentDailyXp;
		}
		void create(xpToAdd);



		const replyResult = await resultify(() => message.reply({
			embeds: [
				simpleEmbed(msgParams(messageCreateConfig.bump.description, [
					userMention(authorId),
					currentDailyXp + xpToAdd,
					MAX_BUMP_XP,
					xpToAdd,
				]), messageCreateConfig.bump.title)
			]
		}));
		if (!replyResult.ok) {
			logger.error(`failed to send thx message for bump, error : ${replyResult.error.message}`);
		}

		if (xpToAdd <= 0) {
			return;
		}

		const result = await addXp(authorId, guildId, xpToAdd);
		if (result.ok) {
			if (retry) {
				void create(xpToAdd);
			}
		} else {
			logger.error(`failed to add xp for bump, error : ${result.error.message}`);
		}
	}

	getBumpType(message: Message<true>): BumpType | null {
		if (message.interaction === null) {
			return null;
		}

		if (isDev && message.author.id === '1150832478702022726') {
			return this.getDevBump(message);
		}

		if (message.author.id === globalConfig.disboardBot) {
			return this.getDisboardBump(message);
		}

		if (message.author.id === globalConfig.DTOPBot) {
			return this.getDTOPBump(message);
		}

		return null;
	}

	getDisboardBump(message: Message<true>): BumpType | null {
		if (message.interaction === null) {
			return null;
		}

		if (message.interaction.commandName === globalConfig.disboardBumpCommand) {
			return 'DISBOARD_BUMP';
		}

		return null;
	}

	getDTOPBump(message: Message<true>): BumpType | null {
		if (message.interaction === null) {
			return null;
		}

		if (message.interaction.commandName === globalConfig.DTOPBumpCommand || message.interaction.commandName == globalConfig.DTOPBoostCommand) {
			const embed = message.embeds[0];

			if (!embed || embed.title === null) {
				return null;
			}

			if (embed.title.startsWith(globalConfig.DTOPBumpEmoji)) {
				return 'DTOP_BUMP';
			}

			if (embed.title.startsWith(globalConfig.DTOPBoostEmoji)) {
				return 'DTOP_BOOST';
			}
		}
		return null;
	}

	getDevBump(message: Message<true>): BumpType | null {
		if (message.interaction === null) {
			return null;
		}
		if (message.interaction.commandName === 'bumpone') {
			return 'DISBOARD_BUMP';
		}
		if (message.interaction.commandName === 'bumptwo' || message.interaction.commandName === 'boost') {
			const embed = message.embeds[0];

			if (!embed || embed.title === null) {
				return null;
			}

			if (embed.title.startsWith(globalConfig.DTOPBumpEmoji)) {
				return 'DTOP_BUMP';
			}

			if (embed.title.startsWith(globalConfig.DTOPBoostEmoji)) {
				return 'DTOP_BOOST';
			}
		}
		return null;
	}

	getBumpXp(bumpType: BumpType): number {
		switch (bumpType) {
		case 'DISBOARD_BUMP':
			return DISBOARD_BUMP_XP;
			break;
		case 'DTOP_BUMP':
			return DTOP_BUMP_XP;
			break;
		case 'DTOP_BOOST':
			return DTOP_BOOST_XP;
		default:
			return 0;
		}

	}
}