import type {BrawlStarsGuild} from '$core/config/guilds/guild.type';
import type {Overwrite} from '$core/utils/typing/typing.type';

const devGuilds = {
	guildMain: {
		name: 'all',
		guildId: '1096122857207111852',
		eventAnnouncements: {
			channelId: '1096131124109000824',
			roleId: '1096122857282621468',
			enable: true
		},
		inviteLink: 'https://discord.gg/s5qWJku7HG'
	},
	guildSection: {
		name: 'global',
		guildId: '1096123374092161024',
		eventAnnouncements: {
			channelId: '1096123377611178009',
			roleId: '1096123374234763313',
			enable: true
		},
		inviteLink: 'https://discord.gg/wtFaNTsesA',
		autoPing: {
			roles: []
		}
	}
} satisfies Record<'guildMain'|'guildSection', Overwrite<Partial<BrawlStarsGuild>, {name: string}>>;

export const devConfig = {
	guilds: devGuilds
};