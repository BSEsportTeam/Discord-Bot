import type {Client} from '$core/client';
import type {Service} from '$core/base/service/service.class';
import type {GuildAlias} from '$core/base/command/command.type';
import type {Interaction} from 'discord.js';

export abstract class Command<S extends Service> {
	readonly client: Client;
	readonly service: S;
	guild: GuildAlias = 'all';

	protected constructor(client: Client, service: S) {
		this.client = client;
		this.service = service;
	}

	abstract run(interaction: Interaction): Promise<void>;

	protected async preRun(interaction: Interaction) {

	}
}