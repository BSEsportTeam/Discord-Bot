import type {BaseGuild} from '../../guild.type';
import {xpConfig} from './xp.config';
import {pubMessage} from './pub_message.config';

export const clashRoyaleGuildConfig: BaseGuild = {
	name: 'clashRoyale',
	guildId: '795972160023822346',
	eventAnnouncements: {
		channelId: '843944880703012915',
		roleId: '828351231243714591',
		enable: true,
	},
	inviteLink: 'https://discord.gg/yvKtPw7GCr',
	xp: xpConfig,
	bumpChannel: '1006679096077602977',
	pubMessages: pubMessage,
};