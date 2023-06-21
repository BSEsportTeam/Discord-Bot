import type {Message} from 'discord.js';
import {ActionRowBuilder, ButtonBuilder, ButtonStyle} from 'discord.js';
import {isTake, setTake} from '$core/handlers/buttons/dropxp/dropxp.util';
import {commandsConfig} from '$core/config/message/command';
import {disableButtons} from '$core/handlers/buttons';
import {resultify} from 'rustic-error';
import {simpleEmbed} from '$core/utils/discord/embet/embet.func';
import {logger} from '$core/utils/logger';

export const endDrop = async (message: Message) => {
	setTimeout(async () => {
		if (isTake(message.id)) {
			return;
		}
		setTake(message.id);

		await disableButtons(message);

		const result = await resultify(() => message.reply({embeds: [simpleEmbed(commandsConfig.dropXp.exec.timeout)]}));

		if (!result.ok) {
			logger.error(`failed to reply to drop, error : ${result.error}`);
		}

	}, 60_000);
};

export const getButtons = (id: string) => new ActionRowBuilder<ButtonBuilder>().addComponents(
	new ButtonBuilder()
		.setStyle(ButtonStyle.Secondary)
		.setLabel(commandsConfig.dropXp.exec.button)
		.setCustomId(id)
);