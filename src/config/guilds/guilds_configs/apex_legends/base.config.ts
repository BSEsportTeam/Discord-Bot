import type {BaseGuild} from '../../guild.type';
import {xpConfig} from './xp.config';
import {pubMessage} from './pub_message.config';

export const apexLegendsGuildConfig: BaseGuild = {
	name: 'apexLegends',
	guildId: '840673242838859786',
	eventAnnouncements: {
		channelId: '913215408448864287',
		roleId: '886738093779091486',
		enable: true
	},
	inviteLink: 'https://discord.gg/6q6eshT83k',
	xp: xpConfig,
	bumpChannel: '1006680768304660480',
	pubMessages: pubMessage,
};