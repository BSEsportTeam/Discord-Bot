import type {ButtonInteraction} from 'discord.js';
import {ActionRowBuilder, ButtonBuilder, ComponentType, EmbedBuilder} from 'discord.js';
import {colors} from '$core/config/global/global.config';
import {buttonsConfig} from '$core/config/message/buttons.config';

export const authorOnly = async (interaction: ButtonInteraction): Promise<boolean> => {
	try {

		if (interaction.message.interaction?.user.id === interaction.user.id) return true;
		await interaction.reply({
			embeds: [new EmbedBuilder()
				.setTitle('Non authorisé')
				.setDescription(buttonsConfig.authorOnly)
				.setColor(colors.notAllowed)],
			ephemeral: true
		});
		return false;
	} catch (e) {
		throw e;
	}
};
export const disableButtons = async (intertaction: ButtonInteraction) => {
	try {
		const components = intertaction.message.components[0];
		const newComponents = new ActionRowBuilder<ButtonBuilder>();
		for (const component of components.components) {
			if (component.type !== ComponentType.Button) continue;
			newComponents.addComponents(new ButtonBuilder(component.data).setDisabled(true));
		}
		await intertaction.message.edit({
			components: [newComponents]
		});
	} catch (e) {
		throw e;
	}
};