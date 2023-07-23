import type {CommandPreReply} from '$core/handlers/commands';
import {SubCommand} from '$core/handlers/commands';
import type {ChatInputCommandInteraction} from 'discord.js';
import type {CommandError} from '$core/utils/error';
import type {Result} from 'rustic-error';
import {ok} from 'rustic-error';
import {commandsConfig} from '$core/config/message/command';

const config = commandsConfig.admin;

export class ReverseXpMovement extends SubCommand {
	name = config.subcmds.reverse_xp_movement.name;
	preReply: CommandPreReply = {
		enable: true,
		ephemeral: false
	};

	async run(interaction: ChatInputCommandInteraction): Promise<Result<boolean, CommandError>> {
		return ok(true);
	}
}