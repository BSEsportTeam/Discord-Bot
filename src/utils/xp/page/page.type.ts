import type {GlobalXPTop, GuildXPTop} from '$core/handlers/database/xp/xp.type';
import type {ActionRowBuilder, ButtonBuilder, EmbedBuilder} from 'discord.js';

export const enum PageTypes {
	GUILD = 'guild',
	GLOBAL = 'global'
}

export type PageInfos = {
	embeds: EmbedBuilder[],
	components: ActionRowBuilder<ButtonBuilder>[]
}
export type GenerateGuildPage = (page: number, data: GuildXPTop[], type: PageTypes.GUILD) => PageInfos;
export type GenerateGlobalPage = (page: number, data: GlobalXPTop[], type: PageTypes.GLOBAL) => PageInfos;

export type GeneratePage = GenerateGuildPage|GenerateGlobalPage;

