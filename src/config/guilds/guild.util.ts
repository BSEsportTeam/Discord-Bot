import type {Snowflake} from 'discord-api-types/globals';
import type {BaseGuild} from '$core/config/guilds/guild.type';
import {guildsConfig} from '$core/config/guilds/guilds.config';

export const getGuildWithId = (id: Snowflake): BaseGuild|null => {
	const server = Object.values(guildsConfig).findIndex(value => value.guildId === id);
	if (server === -1) return null;
	return Object.values(guildsConfig)[server];
};