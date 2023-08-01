import type {ButtonHandler} from '$core/handlers/buttons';
import {buttonsDynamicIds, buttonsIds, DYNAMIC_ID_SEPARATOR} from '$core/handlers/buttons';
import {confirmIds, handlers} from '$core/handlers/buttons/confirm/confirm.const';
import type {ButtonInteraction} from 'discord.js';
import {ActionRowBuilder, ButtonBuilder, ButtonStyle} from 'discord.js';
import type {Result} from 'rustic-error';
import type {ButtonError} from '$core/utils/error';
import {cancel} from '$core/handlers/buttons/confirm/confirm.button';
import {messageConfig} from '$core/config/message';

export const getConfirmHandler = (id: string): ButtonHandler | undefined => {
	if (id.startsWith(buttonsIds.confirm.confirm)) {
		const [subId, args] = buttonsDynamicIds.confirm_confirm.deconstruct(id);
		if (subId in handlers) {
			const handler = handlers[subId as Exclude<(typeof confirmIds)[keyof typeof confirmIds], 'cl'>];
			return {
				id: buttonsIds.confirm.confirm,
				name: handler.name,
				run(interaction: ButtonInteraction): Promise<Result<boolean, ButtonError>> {
					return handler.confirm(interaction, ...args.split(DYNAMIC_ID_SEPARATOR));
				},
				autoDisable: true,
				authorOnly: handler.authorOnly,
				guildOnly: handler.guildOnly,
				preReply: handler.preReply,
				ephemeral: handler.ephemeral
			};
		}
	} else {
		const [subId, args] = buttonsDynamicIds.confirm_cancel.deconstruct(id);
		if (subId === 'cl') {
			return {
				id: buttonsIds.confirm.cancel,
				name: 'cancel',
				run(interaction: ButtonInteraction): Promise<Result<boolean, ButtonError>> {
					return cancel.run(interaction, interaction.message.flags.has('Ephemeral'));
				},
				autoDisable: true,
				authorOnly: false,
				guildOnly: false,
				preReply: false,
				ephemeral: false
			};
		}

		if (subId in handlers) {
			const handler = handlers[subId as Exclude<(typeof confirmIds)[keyof typeof confirmIds], 'cl'>];
			return {
				id: buttonsIds.confirm.cancel,
				name: handler.name,
				run(interaction: ButtonInteraction): Promise<Result<boolean, ButtonError>> {
					if (handler.cancel === null) {
						return cancel.run(interaction, handler.ephemeral || false);
					}
					return handler.cancel(interaction, ...args.split(DYNAMIC_ID_SEPARATOR));
				},
				autoDisable: true,
				authorOnly: handler.authorOnly,
				guildOnly: handler.guildOnly,
				preReply: handler.preReply,
				ephemeral: handler.ephemeral
			};
		}
	}
	return;
};

export const getConfirmButtons = (confirmId: string, cancelId: string | null = null, ...args: string[]) =>
	[new ActionRowBuilder<ButtonBuilder>().addComponents(
		new ButtonBuilder()
			.setLabel(messageConfig.button.confirmSystem.confirmButton)
			.setCustomId(buttonsDynamicIds.confirm_confirm.construct(confirmId, args.join(DYNAMIC_ID_SEPARATOR)))
			.setStyle(ButtonStyle.Success),
		new ButtonBuilder()
			.setLabel(messageConfig.button.confirmSystem.cancelButton)
			.setCustomId(buttonsDynamicIds.confirm_cancel.construct(
				cancelId !== null ? cancelId : confirmIds.cancel
				, args.join(DYNAMIC_ID_SEPARATOR)))
			.setStyle(ButtonStyle.Danger),
	)];