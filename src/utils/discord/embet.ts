import {EmbedBuilder} from 'discord.js';
import {colors} from '$core/config/global/global.config';

export const baseEmbed = (description: string, title?: string): EmbedBuilder => {
	const embed = new EmbedBuilder().setDescription(description);
	if (typeof title !== 'undefined') embed.setTitle(title);
	return embed;
};
export const errorEmbed = (description: string, title?: string): EmbedBuilder => {
	return baseEmbed(description, title).setColor(colors.error);
};
export const successEmbed = (description: string, title?: string): EmbedBuilder => {
	return baseEmbed(description, title).setColor(colors.success);
};

export const  notAllowedEmbed = (description: string, title?: string): EmbedBuilder => {
	return baseEmbed(description, title).setColor(colors.notAllowed);
};