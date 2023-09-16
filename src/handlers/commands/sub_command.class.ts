import type {ChatInputCommandInteraction} from 'discord.js';
import type {Result} from 'rustic-error';
import type {CommandError} from '$core/utils/error';
import {BaseCommand} from '$core/handlers/commands/base_command.class';

export abstract class SubCommand extends BaseCommand {
	abstract name: string
	groupName?: string;

	builder = {
		name: 'nothing',
		description: 'nothing'
	}; // remove abstract error
	abstract run(interaction: ChatInputCommandInteraction): Promise<Result<boolean, CommandError>>;


}