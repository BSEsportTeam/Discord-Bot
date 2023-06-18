import type {BaseGuild} from './guild.type';

export const globalGuildConfig: BaseGuild = {
	name: 'global',
	guildId: '',
	eventAnnouncements: {
		channelId: '',
		roleId: '',
		enable: true
	},
	inviteLink: 'https://discord.gg/F2GTeYT',
	xp: {
		enable: true,
		levelUpRoles: {},
		boosterRole: '',
		xpBoostRole: '',
		disablesChannels: [],
		levelUpChannel: ''
	}
};