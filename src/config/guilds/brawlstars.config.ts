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
			tag: 'UJCQVJV',
			type: BrawlStarsClubType.LADDER,
			globalTop: true,
			localTop: true,
			bestGlobal: 15,
			bestLocal: 1
		},
		{
			name: 'BS Prestige',
			tag: 'JV820R8P',
			type: BrawlStarsClubType.LADDER,
			globalTop: false,
			localTop: true,
			bestLocal: 93
		},
		{
			name: 'BS Kings',
			tag: 'E8LPCQRGV',
			type: BrawlStarsClubType.LADDER
		},
		{
			name: 'BS Assembly',
			tag: 'UUQGLR9P',
			type: BrawlStarsClubType.LADDER
		},
		{
			name: 'BS Esport',
			tag: '9UGGORJ',
			type: BrawlStarsClubType.LADDER
		},
		{
			name: 'BS Legends',
			tag: 'JYOL9YG8',
			type: BrawlStarsClubType.LADDER
		},
		{
			name: 'BS Myths',
			tag: '88QUVJ8YC',
			type: BrawlStarsClubType.LADDER
		},
		// ldc
		{
			name: 'BS Esport Pro',
			tag: '9Y9UCUP',
			type: BrawlStarsClubType.LDC
		},
		{
			name: 'BS Aries',
			tag: '2PQ9RC8UL',
			type: BrawlStarsClubType.LDC
		},
		{
			name: 'BS Esport Elite',
			tag: 'QCJUVQV',
			type: BrawlStarsClubType.LDC
		},
		{
			name: 'BS Demons',
			tag: '2GCPQGL8JY',
			type: BrawlStarsClubType.LDC
		},
		// chills
		{
			name: 'BS Angels',
			tag: '89J2Y8QQ',
			type: BrawlStarsClubType.CHILL
		},
		{
			name: 'BS Shadows',
			tag: '2PY8C9VPJ',
			type: BrawlStarsClubType.CHILL
		}, {
			name: 'BS Heroes',
			tag: '2GPRCPL02',
			type: BrawlStarsClubType.CHILL
		},
		{
			name: 'BS Olympus',
			tag: 'CG2YLR90',
			type: BrawlStarsClubType.CHILL
		},

	]
};