import type {ChatInputCommandInteraction} from 'discord.js';
import type {Result} from 'rustic-error';
import type {CommandError} from '$core/utils/error';

export abstract class SubCommand {
	preReply = {
		enable: false,
		ephemeral: false
	};
	abstract name: string
	groupName?: string;

	abstract run(interaction: ChatInputCommandInteraction): Promise<Result<boolean, CommandError>>;
}