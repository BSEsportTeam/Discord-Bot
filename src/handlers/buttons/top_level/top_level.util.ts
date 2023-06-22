import type {ButtonInteraction} from 'discord.js';
import {PageTypes} from '$core/utils/xp/page/page.type';
import {anyToError, ButtonError} from '$core/utils/error';
import type {Result} from 'rustic-error';
import {error, ok} from 'rustic-error';
import type {GlobalXPTop, GuildXPTop} from '$core/handlers/database/xp';
import {getGlobalTop, getGuildTop} from '$core/handlers/database/xp';
import {generatePage} from '$core/utils/xp/page/page';

export const updateMessage = async (interaction: ButtonInteraction, page: number, type: PageTypes): Promise<Result<boolean, ButtonError>> => {
	let data: GlobalXPTop[]|GuildXPTop[];

	if (type === PageTypes.GLOBAL) {
		const dataResult = await getGlobalTop((page-1)*10, 11);
		if (!dataResult.ok) {
			return error(new ButtonError('failed to get global top', interaction, dataResult.error));
		}
		data = dataResult.value;
	} else {
		const dataResult = await getGuildTop(interaction.guildId || '', (page-1)*10, 11);
		if (!dataResult.ok) {
			return error(new ButtonError('failed to get guild top', interaction, dataResult.error));
		}
		data = dataResult.value;
	}

	const messageInfos = generatePage(page, data, type);

	try {
		await interaction.message.edit(messageInfos);
		return ok(true);
	} catch (e) {
		return error(new ButtonError('Failed to edit top position', interaction, anyToError(e)));
	}

};