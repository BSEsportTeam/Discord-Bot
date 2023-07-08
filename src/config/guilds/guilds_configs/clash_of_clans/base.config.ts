import type {BaseGuild} from '../../guild.type';
import {xpConfig} from './xp.config';
import {pubMessage} from './pub_message.config';

export const clashOfClansGuildConfig: BaseGuild = {
	name: 'clashOfClans',
	guildId: '580422922963779625',
	eventAnnouncements: {
		channelId: '843946679924818000',
		roleId: '863154928792764447',
		enable: true
	},
	inviteLink: 'https://discord.gg/EpPXjK7',
	xp: xpConfig,
	bumpChannel: '1006679961781928067',
	pubMessages: pubMessage,
};