import type {Client} from '$core/Client';
import type {RESTPostAPIChatInputApplicationCommandsJSONBody} from 'discord-api-types/v10';
import type {ChatInputCommandInteraction} from 'discord.js';
import type {servers} from '$core/config/servers/servers.type';
import type {Result} from 'rustic-error';
import type {CommandError} from '$core/utils/error/error.class';

export type guilds = 'all' | servers
export abstract class BaseCommand {
	client: Client;
	abstract builder: RESTPostAPIChatInputApplicationCommandsJSONBody;
	guild: guilds = 'all';
	preReply = {
		enable: false,
		ephemeral: false
	};

	constructor(client: Client) {
		this.client = client;

	}

	private _id?: string = undefined;

	get id(): string {
		return this._id || '';
	}

	set id(id: string) {
		if (typeof this._id !== 'undefined') console.error(`command ${this.builder.name} have already a id (old id: ${this._id}, new id: ${id}`);
		else this._id = id;
	}

	toBuilder(): RESTPostAPIChatInputApplicationCommandsJSONBody {
		return this.builder;
	}

	abstract run(interaction: ChatInputCommandInteraction): Promise<Result<boolean, CommandError>>;
}