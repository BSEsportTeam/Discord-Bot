import type {GeneratePage, PageTypes} from '$core/utils/xp/page/page.type';
import type {GlobalXPTop, GuildXPTop} from '$core/handlers/database/xp';
import type {EmbedBuilder} from 'discord.js';
import {simpleEmbed} from '$core/utils/discord';

export const generatePage: GeneratePage = (page: number, data: GuildXPTop|GlobalXPTop, type: PageTypes): EmbedBuilder => {
	return simpleEmbed('');
};