import type {Message} from 'discord.js';
import {Collection} from 'discord.js';
import {getGuildWithId} from '$core/config/guilds';
import type {CooldownCollection} from '$core/events/message_create/message_create.type';
import {
	BOOSTER_MULTIPLIER,
	COOLDOWN_IN_SECONDS,
	MAX_XP_PER_MESSAGE,
	MIN_XP_PER_MESSAGE,
	XP_BOOST_MULTIPLIER
} from '$core/utils/xp/xp.const';
import {addXp} from '$core/handlers/database/xp';

let cooldownCollection: CooldownCollection = new Collection();

export const checkXp = async (message: Message) => {
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

	const newXp = await addXp(message.author.id, message.guildId, xpCount);

	cooldownCollection.set(`${message.guildId}.${message.author.id}`, message.createdTimestamp + (COOLDOWN_IN_SECONDS*1000));

};

export const clearCooldown = () => {
	const now = Date.now();
	const newCooldown = cooldownCollection.filter(v => v > now);
	cooldownCollection.clear();
	cooldownCollection = newCooldown;
};