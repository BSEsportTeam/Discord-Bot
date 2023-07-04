import type {Snowflake} from 'discord-api-types/globals';
import type {BaseGuild, BrawlStarsGuild} from './guild.type';
import {guildsConfig} from './guilds.config';
import type {Overwrite} from '$core/utils/type';
import {devConfig} from '$core/config/guilds/_dev/dev.config';
import type {GuildAlias} from '$core/handlers/commands';

export const getGuildWithId = (id: Snowflake): BaseGuild|null => {
	const server = Object.values(guildsConfig).findIndex(value => value.guildId === id);
	if (server === -1) return null;
	return Object.values(guildsConfig)[server];
};

export const getDevGuildWithId = (id: Snowflake): Overwrite<BrawlStarsGuild, {
	name: GuildAlias
}> | Overwrite<BaseGuild, { name: GuildAlias }> | null => {
	if (id === devConfig.guilds.guildMain.guildId) return devConfig.guilds.guildMain;
	if (id === devConfig.guilds.guildSection.guildId) return devConfig.guilds.guildSection;
	return null;
};