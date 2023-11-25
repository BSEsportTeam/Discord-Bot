import type {BaseGuild} from '../../guild.type';
import {xpConfig} from './xp.config';
import {pubMessage} from './pub_message.config';

export const callOfDutyGuildConfig: BaseGuild = {
	name: 'callOfDuty',
	guildId: '780909897083781151',
	eventAnnouncements: {
		channelId: '913215137933045781',
		roleId: '886737608162570311',
		enable: true,
	},
	inviteLink: 'https://discord.gg/USZ3DEZU2c',
	xp: xpConfig,
	bumpChannel: '1006681316449853571',
	pubMessages: pubMessage,
};