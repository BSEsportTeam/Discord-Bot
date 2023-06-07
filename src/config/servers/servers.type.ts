import type {Snowflake} from 'discord-api-types/globals';

export type GuildName = 'global' | 'brawlStars'

export type BaseServer = {
	serverId: Snowflake;
	name: string;
	eventAnnouncements: EventAnnouncements;
	inviteLink: string
}
export type EventAnnouncements = {
	channelId: string;
	roleId: string;
	enable: boolean
}

export type BrawlStarsServer = BaseServer & {
	autoPing: {
		roles: []
	}
}