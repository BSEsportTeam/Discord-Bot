import type {RESTPostAPIChatInputApplicationCommandsJSONBody} from 'discord-api-types/v10';
import type {DevFacultative} from '$core/utils/dev/dev.type';
import type {CommandPreReply, GuildAlias, UnknownCommand} from '$core/handlers/commands/command.type';


export abstract class BaseCommand implements UnknownCommand, DevFacultative {
	guild: GuildAlias = 'all';
	preReply: CommandPreReply = {
		enable: false,
		ephemeral: false
	};
	abstract builder: RESTPostAPIChatInputApplicationCommandsJSONBody;
	isEnableInDev = false;
}