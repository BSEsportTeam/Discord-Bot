import type {Client} from '$core/client';
import type {RESTPostAPIChatInputApplicationCommandsJSONBody} from 'discord-api-types/v10';
import type {GuildAlias, UnknownCommand} from '$core/commands/command.type';


export abstract class BaseCommand implements UnknownCommand {
	client: Client;
	abstract builder: RESTPostAPIChatInputApplicationCommandsJSONBody;
	guild: GuildAlias = 'all';
	preReply = {
		enable: false,
		ephemeral: false
	};

	constructor(client: Client) {
		this.client = client;

	}
}