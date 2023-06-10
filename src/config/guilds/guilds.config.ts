import type {Guilds} from './guild.type';
import {globalGuildConfig} from './global_guild.config';
import {brawlStarsGuildConfig} from './brawlstars.config';

export const guildsConfig = {
	global: globalGuildConfig,
	brawlStars: brawlStarsGuildConfig
} satisfies Guilds;