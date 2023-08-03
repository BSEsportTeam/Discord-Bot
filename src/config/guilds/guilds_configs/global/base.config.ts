import type {GlobalGuild} from '../../guild.type';
import {xpConfig} from './xp.config';
import {pubMessage} from './pub_message.config';

export const globalGuildConfig: GlobalGuild = {
	name: 'global',
	guildId: '346989473143455744',
	eventAnnouncements: {
		channelId: '782687067674771467',
		roleId: '849734730596483092',
		enable: false
	},
	inviteLink: 'https://discord.gg/F2GTeYT',
	xp: xpConfig,
	bumpChannel: '979400972315000852',
	pubMessages: pubMessage,
	primeChannel: '1083522288441368596'
};