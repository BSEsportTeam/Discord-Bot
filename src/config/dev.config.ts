import type {BaseServer} from '$core/config/servers/servers.type';

const devServers = {
	serverMain: {
		name: 'Général',
		serverId: '1096122857207111852',
		eventAnnouncements: {
			channelId: '1096131124109000824',
			roleId: '1096122857282621468',
			enable: true
		},
		inviteLink: 'https://discord.gg/s5qWJku7HG'
	},
	serverSection: {
		name: 'Section',
		serverId: '1096123374092161024',
		eventAnnouncements: {
			channelId: '1096123377611178009',
			roleId: '1096123374234763313',
			enable: true
		},
		inviteLink: 'https://discord.gg/wtFaNTsesA'
	}
} satisfies Record<'serverMain'|'serverSection', BaseServer>;

export const devConfig = {
	servers: devServers
};