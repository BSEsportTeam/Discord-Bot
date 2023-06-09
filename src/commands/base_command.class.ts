import type {Client} from '$core/client';
import type {CommandPreReply, GuildAlias, UnknownCommand} from '$core/commands/command.type';
import type {RESTPostAPIChatInputApplicationCommandsJSONBody} from 'discord-api-types/v10';
import type {DevFacultative} from '$core/utils/dev/dev.type';


export abstract class BaseCommand implements UnknownCommand, DevFacultative{
	client: Client;
	guild: GuildAlias = 'all';
	preReply: CommandPreReply = {
		enable: false,
		ephemeral: false
	};
	abstract builder: RESTPostAPIChatInputApplicationCommandsJSONBody;
	isEnableInDev = false;

	constructor(client: Client) {
		this.client = client;

	}
}