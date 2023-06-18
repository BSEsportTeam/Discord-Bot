import type {BrawlStarsGuild} from './guild.type';

export const brawlStarsGuildConfig: BrawlStarsGuild = {
	name: 'brawlStars',
	guildId: '',
	eventAnnouncements: {
		channelId: '',
		roleId: '',
		enable: true
	},
	autoPing: {
		roles: {},
		channel: ''
	},
	inviteLink: 'https://discord.gg/aWPCgqz',
	xp: {
		enable: true,
		levelUpRoles: {},
		boosterRole: '',
		xpBoostRole: '',
		disablesChannels: [],
		levelUpChannel: ''
	}
};