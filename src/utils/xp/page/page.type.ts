import type {GlobalXPTop, GuildXPTop} from '$core/handlers/database/xp/xp.type';
import type {EmbedBuilder} from 'discord.js';

export const enum PageTypes {
	GUILD,
	GLOBAL
}

export type GenerateGuildPage = (page: number, data: GuildXPTop, type: PageTypes.GUILD) => EmbedBuilder;
export type GenerateGlobalPage = (page: number, data: GlobalXPTop, type: PageTypes.GLOBAL) => EmbedBuilder;

export type GeneratePage = GenerateGuildPage|GenerateGlobalPage;