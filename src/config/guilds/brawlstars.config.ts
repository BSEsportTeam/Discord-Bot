import type {BrawlStarsGuild} from './guild.type';
import {BrawlStarsClubType} from './guild.type';

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
	},
	bumpChannel: '',
	clubs: [
		{
			// leader
			name: 'BS Immortals',
			id: 'UJCQVJV',
			type: BrawlStarsClubType.LEADER,
			globalTop: true,
			localTop: true,
			bestGlobal: 15,
			bestLocal: 1
		},
		{
			name: 'BS Prestige',
			id: 'JV820R8P',
			type: BrawlStarsClubType.LEADER,
			globalTop: false,
			localTop: true,
			bestLocal: 93
		},
		{
			name: 'BS Kings',
			id: 'E8LPCQRGV',
			type: BrawlStarsClubType.LEADER
		},
		{
			name: 'BS Assembly',
			id: 'UUQGLR9P',
			type: BrawlStarsClubType.LEADER
		},
		{
			name: 'BS Esport',
			id: '9UGGORJ',
			type: BrawlStarsClubType.LEADER
		},
		{
			name: 'BS Legends',
			id: 'JYOL9YG8',
			type: BrawlStarsClubType.LEADER
		},
		{
			name: 'BS Myths',
			id: '88QUVJ8YC',
			type: BrawlStarsClubType.LEADER
		},
		// ldc
		{
			name: 'BS Esport Pro',
			id: '9Y9UCUP',
			type: BrawlStarsClubType.LDC
		},
		{
			name: 'BS Aries',
			id: '2PQ9RC8UL',
			type: BrawlStarsClubType.LDC
		},
		{
			name: 'BS Esport Elite',
			id: 'QCJUVQV',
			type: BrawlStarsClubType.LDC
		},
		{
			name: 'BS Demons',
			id: '2GCPQGL8JY',
			type: BrawlStarsClubType.LDC
		},
		// chills
		{
			name: 'BS Angels',
			id: '89J2Y8QQ',
			type: BrawlStarsClubType.CHILL
		},
		{
			name: 'BS Shadows',
			id: '2PY8C9VPJ',
			type: BrawlStarsClubType.CHILL
		}, {
			name: 'BS Heroes',
			id: '2GPRCPL02',
			type: BrawlStarsClubType.CHILL
		},
		{
			name: 'BS Olympus',
			id: 'CG2YLR90',
			type: BrawlStarsClubType.CHILL
		},

	]
};