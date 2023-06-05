import type {Client} from '$core/client';
import type {CacheType, Interaction} from 'discord.js';
import {ApplicationCommandType, InteractionType} from 'discord.js';
import {handleButton} from '$core/handlers/buttons/buttons';
import {commandRun} from '$core/handlers/commands/command_run';

export const interaction = async (client: Client, interaction: Interaction<CacheType>) => {
	switch (interaction.type) {
	case InteractionType.ApplicationCommand:
		switch (interaction.commandType) {
		case ApplicationCommandType.ChatInput:
			await commandRun(interaction);
			break;

		default:
			return;
		}
		break;
	case InteractionType.MessageComponent:
		if (interaction.isButton()) {
			await handleButton(interaction);
		}
		break;
	default:
		return;
	}
	
};