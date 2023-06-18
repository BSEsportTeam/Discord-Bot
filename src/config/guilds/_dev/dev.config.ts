import type {BrawlStarsGuild} from '$core/config/guilds/guild.type';
import type {Overwrite} from '$core/utils/type/type';

const devGuilds = {
	guildMain: {
		name: 'all',
		guildId: '1096122857207111852',
		eventAnnouncements: {
			channelId: '1096131124109000824',
			roleId: '1096122857282621468',
			enable: true
		},
		inviteLink: 'https://discord.gg/s5qWJku7HG',
		xp: {
			enable: true,
			levelUpRoles: {},
			boosterRole: '',
			xpBoostRole: '',
			disablesChannels: [],
			levelUpChannel: ''
		}
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
		xp: {
			enable: true,
			levelUpRoles: {},
			boosterRole: '',
			xpBoostRole: '',
			disablesChannels: [],
			levelUpChannel: ''
		},
		autoPing: {
			roles: {
				pro: '1096123374306070622',
				staff: '1096123374306070628'
			},
			channel: '1096123376965263394'
		}
	}
} satisfies Record<'guildMain'|'guildSection', Overwrite<Partial<BrawlStarsGuild>, {name: string}>>;

export const devConfig = {
	guilds: devGuilds
};