import type {Snowflake} from 'discord-api-types/globals';
import type {BaseServer} from '$core/config/servers/servers.type';
import {serversConfig} from '$core/config/servers/servers.config';
import {brawlStarsServerConfig} from '$core/config/servers/brawlstars.config';

export const getServerById = (id: Snowflake): BaseServer|null => {
	const server = Object.values(serversConfig).findIndex(value => value.serverId === id);
	if (server === -1) return null;
	return Object.values(serversConfig)[server];
};
