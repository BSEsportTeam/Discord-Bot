import type {BaseGuild} from './guild.type';

export const globalGuildConfig: BaseGuild = {
	name: 'global',
	guildId: '',
	eventAnnouncements: {
		channelId: '',
		roleId: '',
		enable: false
	},
	inviteLink: 'https://discord.gg/F2GTeYT',
	xp: {
		enable: true,
		levelUpRoles: {},
		boosterRole: '',
		xpBoostRole: '',
		disablesChannels: [],
		levelUpChannel: ''
	},
	bumpChannel: '',
	pubMessages: {
		enable: true,
		channelId: '',
		messages: []
	},
};