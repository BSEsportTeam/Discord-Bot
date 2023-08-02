import type {ConfirmButtonHandler} from '$core/handlers/buttons/confirm';
import type {ButtonInteraction} from 'discord.js';
import type {Result} from 'rustic-error';
import type {ButtonError} from '$core/utils/error';
import {getSavedPrimes} from '$core/commands/globals/other/admin/prime_staff/prime_staff.util';
import {errorEmbed} from '$core/utils/discord';
import {commandsConfig} from '$core/config/message/command';
import {sendButtonReply} from '$core/handlers/buttons';
import {DayJS} from '$core/utils/function/dayjs';

const config = commandsConfig.admin.exec.primeStaff;
export const primeStaff: ConfirmButtonHandler = {
	name: 'primeStaff',
	cancel: null,
	authorOnly: true,
	preReply: true,
	confirm: async (interaction: ButtonInteraction): Promise<Result<boolean, ButtonError>> => {
		const prime = getSavedPrimes();
		if (typeof prime === 'undefined') {
			return sendButtonReply(interaction, {embeds: [errorEmbed(config.noData)]}, true);
		}

		if (DayJS().diff(interaction.message.createdAt, 'hour') >= 2) {
			return sendButtonReply(interaction, {embeds: [errorEmbed(config.overtime)]}, true);
		}

		return sendButtonReply(interaction, {embeds: [errorEmbed(config.noData)]}, true);
	}

};