import type {Client} from '$core/client';
import type {Service} from '$core/base/service/service.class';
import type {
	ChatCommand,
	CommandInteraction,
	GuildAlias,
	MessageCommand,
	ProfileCommand,
	SubCommandGroups,
	SubCommands
} from '$core/base/command/command.type';
import type {SlashCommandBuilder} from 'discord.js';

export abstract class Command<S extends Service> {
	readonly client: Client;
	readonly service: S;

	guild: GuildAlias = 'all';
	abstract name: string;
	slashBuilder?: SlashCommandBuilder;
	messageBuilder?: MessageComm;

	subCommandGroups: SubCommandGroups<S> = new Map();
	subCommands: SubCommands<S> = new Map();

	protected constructor(client: Client, service: S) {
		this.client = client;
		this.service = service;
	}

	toJSON() {

	}

	protected async preRun(interaction: CommandInteraction) {

	}

	private isChatInput(): this is ChatCommand<S> {
		return 'runChat' in this && typeof this.runChat === 'function';
	}

	private isProfileInput(): this is ProfileCommand<S> {
		return 'runProfile' in this && typeof this.runProfile === 'function';
	}

	private isMessageInput(): this is MessageCommand<S> {
		return 'runMessage' in this && typeof this.runMessage === 'function';
	}
}