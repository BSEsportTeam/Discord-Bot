import {ActionRowBuilder, ButtonBuilder, ButtonStyle} from 'discord.js';
import {buttonsIds} from '$core/utils/ids';
import {commandsConfig} from '$core/config/commands/commands.config';
import type {MessageReference} from '$core/commands/servers/global/announce_event/announce_event.type';

export const getActionsRow = (): [ActionRowBuilder<ButtonBuilder>] => {
	return  [new ActionRowBuilder<ButtonBuilder>().addComponents(
		new ButtonBuilder()
			.setLabel(commandsConfig.annonceevent.other.buttons.valid)
			.setCustomId(buttonsIds.eventAnnouncements.confirm)
			.setStyle(ButtonStyle.Success),
		new ButtonBuilder()
			.setLabel(commandsConfig.annonceevent.other.buttons.refuse)
			.setCustomId(buttonsIds.eventAnnouncements.cancel)
			.setStyle(ButtonStyle.Danger),
	)];
};

export const getMessageReference = (link: string): MessageReference|null => {
	if (link.includes('/') && new RegExp('https:\\/\\/([a-z]*\\.|)discord\\.com\\/channels.*[0-9]+\\/[0-9]+\\/[0-9]+').test(link)) {
		const split = link.split('/');

		if (!isValidSnowflake(split[5])||!isValidSnowflake(split[6])) return null;
		return {channelId: split[5], messageId: split[6]};
	}
	
	else if (isValidSnowflake(link)) return {messageId: link};
	else return null;
};

const isValidSnowflake = (id: string): boolean => {
	if (!id.match(/^\d+$/)) return false;
	return BigInt(id).toString() === id && id.length >= 15 && id.length <= 22;
};