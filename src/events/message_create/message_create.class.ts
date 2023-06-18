import {Event} from '$core/handlers/events';
import {Dev} from '$core/utils/dev';
import type {Message} from 'discord.js';
import {cooldownCollection} from './message_create.util';
import {getGuildWithId} from '$core/config/guilds';
import {
	addXp,
	BOOSTER_MULTIPLIER,
	COOLDOWN_IN_SECONDS,
	MAX_XP_PER_MESSAGE,
	MIN_XP_PER_MESSAGE,
	XP_BOOST_MULTIPLIER
} from '$core/utils/xp';
import {logger} from '$core/utils/logger';
import {isDebuggableError} from '$core/utils/error';

@Dev
export default class MessageCreate extends Event<'messageCreate'> {
	name = 'messageCreate' as const;

	async run(message: Message): Promise<void>  {
		//check xp
		void this.checkXP(message);
	}

	async checkXP(message: Message) {
		if (message.author.bot) {
			return;
		}

		if (message.guild === null || message.guildId === null || !message.inGuild() || message.member === null) {
			return;
		}

		//check xp
		const xpConfig = getGuildWithId(message.guildId);
		if (xpConfig === null || xpConfig.xp.enable) {
			return;
		}

		if (xpConfig.xp.disablesChannels.includes(message.channelId)) {
			return;
		}

		const cooldown = cooldownCollection.get(`${message.guildId}.${message.author.id}`);

		if (typeof cooldown === 'undefined' || cooldown > message.createdTimestamp) {
			return;
		}

		let xpCount = Math.floor(Math.random() * (MAX_XP_PER_MESSAGE - MIN_XP_PER_MESSAGE + 1))+MIN_XP_PER_MESSAGE;

		if (message.member.roles.cache.has(xpConfig.xp.xpBoostRole)) {
			xpCount *= XP_BOOST_MULTIPLIER;

		} else if (message.member.roles.cache.has(xpConfig.xp.boosterRole)) {
			xpCount *= BOOSTER_MULTIPLIER;
		}

		const result = await addXp(message.member.id, message.guildId, xpCount);

		if (!result.ok) {
			logger.error(`failed to add xp after message, error : ${result.error.message}`, isDebuggableError(result.error) ? result.error.debug() : undefined);
			return;
		}

		cooldownCollection.set(`${message.guildId}.${message.author.id}`, message.createdTimestamp + (COOLDOWN_IN_SECONDS*1000));
	}
}