import type {Snowflake} from 'discord-api-types/globals';

export type GuildName = 'global' | 'brawlStars'

export type BaseGuild = {
	guildId: Snowflake;
	name: GuildName;
	eventAnnouncements: EventAnnouncements;
	inviteLink: string
}
export type EventAnnouncements = {
	channelId: string;
	roleId: string;
	enable: boolean
}

export type BrawlStarsGuild = BaseGuild & {
	autoPing: {
		roles: Record<string, Snowflake>
		channel: Snowflake;
	}
}

export type Guilds = Record<GuildName, BaseGuild>