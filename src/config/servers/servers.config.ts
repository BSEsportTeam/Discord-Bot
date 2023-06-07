import type {BaseServer, GuildName} from './servers.type';
import {globalServerConfig} from './global.config';
import {brawlStarsServerConfig} from './brawlstars.config';

export const serversConfig = {
	global: globalServerConfig,
	brawlStars: brawlStarsServerConfig
} satisfies Record<GuildName, BaseServer>;