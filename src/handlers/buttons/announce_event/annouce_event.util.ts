import type {GuildBasedChannel, NewsChannel, TextChannel} from 'discord.js';
import {ChannelType} from 'discord.js';

export const isValidChannel = (channel: GuildBasedChannel): channel is TextChannel | NewsChannel  => {
	return channel.type === ChannelType.GuildText || channel.type === ChannelType.GuildAnnouncement;
};