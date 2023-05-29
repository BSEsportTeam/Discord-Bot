import type {ButtonInteraction} from 'discord.js';
import {buttonsIds} from '$core/utils/ids';
import {announcementEventCancel, announcementEventConfirm} from '$core/utils/handlers/buttons/announcementevent';

export const handleButton = async (interaction: ButtonInteraction) => {
	try {
		if (!interaction.inGuild()) return;
		const id = interaction.customId;

		switch (id) {
		case buttonsIds.eventAnnouncements.confirm:
			await announcementEventConfirm(interaction);
			return;
		case buttonsIds.eventAnnouncements.cancel:
			await announcementEventCancel(interaction);
			return;
		default:
			return;
		}
	} catch (e) {
		interaction.reply({
			content: 'une erreur est arrivé',
			ephemeral: true,
		}).catch(e => {
			console.error(e);
		});
		console.error(e);
	}
};