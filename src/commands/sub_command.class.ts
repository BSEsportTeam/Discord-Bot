import type {ChatInputCommandInteraction} from 'discord.js';
import type {Result} from 'rustic-error';
import type {CommandError} from 'src/utils/error';

export abstract class SubCommand {
	preReply = {
		enable: false,
		ephemeral: false
	};
	abstract run(interaction: ChatInputCommandInteraction): Promise<Result<boolean, CommandError>>;
}