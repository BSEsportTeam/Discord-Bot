import {totalXp} from '$core/utils/xp/const/total_xp.const';
import type {Snowflake} from 'discord-api-types/globals';
import type {LevelUpRoleInfosEvolutionary} from '$core/config/guilds';
import {getGuildWithId, LevelUpRoleType} from '$core/config/guilds';
import {logger} from '$core/utils/logger';
import {client} from '$core/index';
import {resultify} from 'rustic-error';
import {getMessageChannel} from '$core/utils/discord/channel';
import {msgParams} from '$core/utils/function/string';
import {messageConfig} from '$core/config/message';
import {userMention} from 'discord.js';
import {getGuildMember} from '$core/utils/discord/member';

export const calculateLevel = (xp: number): number => {
	let level = 0;

	for (const [key, value] of Object.entries(totalXp)) {
		if (xp >= value) {
			level = parseInt(key, 10);
		} else {
			break;
		}
	}

	return level;
};

export const checkXpRoles = async (userId: Snowflake, guildId: Snowflake, oldLevel: number, newLevel: number) => {

	const memberResult = await getGuildMember(userId, guildId);

	if (!memberResult.ok) {
		logger.error(`failed to get guild member for xp role with id ${userId} in guild ${guildId}, error : ${memberResult.error.message}`);
		return;
	}

	const member = memberResult.value;

	const config = getGuildWithId(guildId);

	if (config === null) {
		logger.error(`failed to find config for guild ${guildId} for send xp role message`);
		return;
	}

	const rolesToAdd: Snowflake[] = [];
	let lastRole: Snowflake|undefined;
	let newRole: LevelUpRoleInfosEvolutionary|undefined;

	for (const key of Object.keys(config.xp.levelUpRoles)) {

		const numericKey = parseInt(key, 10);
		const infos = config.xp.levelUpRoles[numericKey];

		if (numericKey > oldLevel && numericKey <= newLevel && infos.type === LevelUpRoleType.CUMULATIVE) {
			rolesToAdd.push(infos.id);
		}

		if (numericKey <= oldLevel && infos.type === LevelUpRoleType.EVOLUTIONARY) {
			lastRole = infos.id;
		}

		if (numericKey <= newLevel && infos.type === LevelUpRoleType.EVOLUTIONARY) {
			newRole = infos;
		}
	}

	if ( typeof newRole !== 'undefined' &&  lastRole !== newRole.id) {
		rolesToAdd.push(newRole.id);

		if (typeof lastRole !== 'undefined') {
			const removeResult = await resultify(() => member.roles.remove(lastRole || '', 'xp system'));

			if (!removeResult.ok) {
				logger.error(`failed to remove roles to member ${userId} in guild ${guildId} for xp system, error : ${removeResult.error.message}`);
			}
		}

		const guild = client.guilds.cache.get(guildId);

		if (typeof guild === 'undefined') {
			logger.error(`failed to find cache for guild ${guildId} for send level up message`);
			return;
		}

		const channelResult = await getMessageChannel(guildId, config.xp.levelUpChannel, 'xp roles');

		if (!channelResult.ok) {
			logger.error(channelResult.error.message);
			return;
		}

		const channel = channelResult.value;
		const msg = msgParams(messageConfig.xp.roleUp, [member.displayName, newRole.name, newRole.message]);

		const result = await resultify(() => channel.send(msg));

		if (!result.ok) {
			logger.error(`failed to send message for role up in channel ${channel.id} in guild ${guildId}, error : ${result.error.message}`);
		}

	}
	const addResult = await resultify(() => member.roles.add(rolesToAdd, 'xp system'));

	if (!addResult.ok) {
		logger.error(`failed to add roles to member ${userId} in guild ${guildId} for xp system, error : ${addResult.error.message}`);
	}

};

export const sendLevelUpMessage = async (userId: Snowflake, guildId: Snowflake, level: number) => {
	const config = getGuildWithId(guildId);

	if (config === null) {
		logger.error(`failed to find config for guild ${guildId} for send level up message`);
		return;
	}

	const channelResult = await getMessageChannel(guildId, config.xp.levelUpChannel, 'xp level up message');

	if (!channelResult.ok) {
		logger.error(channelResult.error.message);
		return;
	}

	const channel = channelResult.value;

	const result = await resultify(() => channel.send(msgParams(messageConfig.xp.levelUp, [userMention(userId), level])));

	if (!result.ok) {
		logger.error(`failed to send message for level up in channel ${channel.id} in guild ${guildId}, error : ${result.error.message}`);
	}
};