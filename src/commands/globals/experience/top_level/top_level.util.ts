import type {PageTypes} from '$core/utils/xp/page/page.type';
import {ActionRowBuilder, ButtonBuilder, ButtonStyle} from 'discord.js';
import {commandsConfig} from '$core/config/message/command';
import {buttonsDynamicIds} from '$core/handlers/buttons';

export const getButton = (type: PageTypes) => [new ActionRowBuilder<ButtonBuilder>().addComponents(
	new ButtonBuilder()
		.setLabel(commandsConfig.topLevel.other.buttons.detailed)
		.setStyle(ButtonStyle.Primary)
		.setCustomId(buttonsDynamicIds.topLevelDetailed.construct(type))
)];