import type {Client} from '$core/client';
import type {RESTPostAPIChatInputApplicationCommandsJSONBody} from 'discord-api-types/v10';
import type {ChatInputCommandInteraction} from 'discord.js';
import type {Result} from 'rustic-error';
import type {CommandError} from '$core/utils/error/';
import type {Guilds} from '$core/commands/command.type';

export abstract class BaseCommand {
	client: Client;
	abstract builder: RESTPostAPIChatInputApplicationCommandsJSONBody;
	guild: Guilds = 'all';
	preReply = {
		enable: false,
		ephemeral: false
	};

	constructor(client: Client) {
		this.client = client;

	}
	abstract run(interaction: ChatInputCommandInteraction): Promise<Result<boolean, CommandError>>;
}