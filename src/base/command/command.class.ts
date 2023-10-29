import type {Client} from '$core/client';
import type {Service} from '$core/base/service/service.class';
import type {CommandResult, GuildAlias, SubCommandGroups, SubCommands} from '$core/base/command/command.type';
import type {ChatInputCommandInteraction, SlashCommandBuilder} from 'discord.js';

export abstract class Command<S extends Service> {
	readonly client: Client;
	readonly service: S;

	guild: GuildAlias = 'all';
	abstract name: string;
	abstract slashBuilder: SlashCommandBuilder;

	subCommandGroups: SubCommandGroups<S> = new Map();
	subCommands: SubCommands<S> = new Map();

	protected constructor(client: Client, service: S) {
		this.client = client;
		this.service = service;
	}

	toJSON() {
		return this.slashBuilder.toJSON();
	}

	abstract run(interaction: ChatInputCommandInteraction): Promise<CommandResult>;

	protected async preRun(interaction: ChatInputCommandInteraction) {
	}
}