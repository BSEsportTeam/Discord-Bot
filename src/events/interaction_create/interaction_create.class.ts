import {Event} from '$core/handlers/events/event.class';
import type {Interaction} from 'discord.js';
import {ApplicationCommandType, InteractionType} from 'discord.js';
import {commandRun} from '$core/handlers/commands/command_run';
import {handleButton} from '$core/handlers/buttons';

export default class InteractionCreate extends Event<'interactionCreate'> {

	name = 'interactionCreate' as const;

	isEnableInDev = true; //Always enable in dev

	run(interaction: Interaction): void {

		switch (interaction.type) {

		case InteractionType.ApplicationCommand:
			switch (interaction.commandType) {

			case ApplicationCommandType.ChatInput:
				void commandRun(interaction);
				break;

			default:
				return;
			}
			break;

		case InteractionType.MessageComponent:
			if (interaction.isButton()) {
				void handleButton(interaction);
			}
			break;

		default:
			return;
		}
	}

}