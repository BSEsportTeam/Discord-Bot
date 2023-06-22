import type {ActionRowBuilder, ButtonBuilder, EmbedBuilder} from 'discord.js';

export const enum PageTypes {
	GUILD = 'guild',
	GLOBAL = 'global'
}

export type PageInfos = {
	embeds: EmbedBuilder[],
	components: ActionRowBuilder<ButtonBuilder>[]
}

