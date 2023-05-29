import type {Client} from '$core/Client';
import type { CacheType, Interaction} from 'discord.js';
import {ApplicationCommandType, InteractionType} from 'discord.js';
import {disableButtons} from '$core/utils/handlers/buttons/utils';
import {handleButton} from '$core/utils/handlers/buttons/buttons';
import {runCommand} from '$core/utils/handlers/commands/run';

export const interaction = async (client: Client, interaction: Interaction<CacheType>) => {
	switch (interaction.type) {
	case InteractionType.ApplicationCommand:
		switch (interaction.commandType) {
		case ApplicationCommandType.ChatInput:
			await runCommand(client, interaction);
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