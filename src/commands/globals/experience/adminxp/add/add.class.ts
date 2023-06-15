import {SubCommand} from '$core/handlers/commands';
import type {CommandError} from '$core/utils/error';
import type {Result} from 'rustic-error';
import {ok} from 'rustic-error';
import type {ChatInputCommandInteraction} from 'discord.js';

export class AdminXpAdd extends SubCommand {

	async run(interaction: ChatInputCommandInteraction): Promise<Result<boolean, CommandError>> {
		return ok(true);
	}
}