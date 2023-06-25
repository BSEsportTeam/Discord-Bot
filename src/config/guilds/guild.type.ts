import type {Snowflake} from 'discord-api-types/globals';

export type GuildName = 'global' | 'brawlStars'

export type BaseGuild = {
	guildId: Snowflake;
	name: GuildName;
	eventAnnouncements: EventAnnouncements;
	inviteLink: string;
	xp: XpInfos;
	bumpChannel: Snowflake;
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

export type BrawlStarsGuild = BaseGuild & {
	autoPing: {
		roles: Record<string, Snowflake>
		channel: Snowflake;
	},
	clubs: BrawlStarsClub[];
}

export enum BrawlStarsClubType {
	LEADER = 'Leader',
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