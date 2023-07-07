import type {Snowflake} from 'discord-api-types/globals';
import type {EmbedBuilder} from 'discord.js';

export type GuildName = 'global' | 'brawlStars'

export type BaseGuild = {
	guildId: Snowflake;
	name: GuildName;
	eventAnnouncements: EventAnnouncements;
	inviteLink: string;
	xp: XpInfos;
	bumpChannel: Snowflake;
	pubMessages: PubMessagesGlobalConfig
}

export type EventAnnouncements = {
	channelId: string;
	roleId: string;
	enable: boolean;
}

export type XpInfos = {
	enable: boolean;
	levelUpRoles: Record<number, LevelUpRoleInfos>
	boosterRole: Snowflake;
	xpBoostRole: Snowflake;
	disablesChannels: Snowflake[];
	levelUpChannel: Snowflake;
}

export enum LevelUpRoleType {
	CUMULATIVE,
	EVOLUTIONARY
}

export type LevelUpRoleInfosCumulative = {
	id: Snowflake;
	name: string;
	type: LevelUpRoleType.CUMULATIVE;
}

export type LevelUpRoleInfosEvolutionary = {
	id: Snowflake;
	name: string;
	message: string;
	type: LevelUpRoleType.EVOLUTIONARY;
}

export type LevelUpRoleInfos = LevelUpRoleInfosCumulative | LevelUpRoleInfosEvolutionary;

export type PubMessagesGlobalConfig = {
	enable: boolean;
	channelId: Snowflake;
	messages: PubMessageConfig[];
}

export type PubMessageConfig = {
	embed: EmbedBuilder;
	buttonsLinks?: Record<string, string>;
}

export type BrawlStarsGuild = BaseGuild & {
	autoPing: {
		roles: Record<string, Snowflake>
		channel: Snowflake;
	},
	clubs: BrawlStarsClub[];
}

export enum BrawlStarsClubType {
	LADDER = 'Leader',
	LDC = 'Ldc',
	CHILL = 'Chill'
}

export type BrawlStarsClub = {
	name: string;
	tag: string;
	type: BrawlStarsClubType;
	globalTop?: boolean;
	localTop?: boolean;
	bestGlobal?: number;
	bestLocal?: number;
}

export type Guilds = Record<GuildName, BaseGuild>