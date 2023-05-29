import {Client as BClient, Collection, IntentsBitField, REST} from 'discord.js';
import {config} from '$core/config';
import type {BaseCommand} from '$core/commands/BaseCommand';
import {loadEvents} from '$core/utils/handlers/events/loader';
import type {Snowflake} from 'discord-api-types/globals';

type CommandAliasName = `${Snowflake}-${string}`|string;
export class Client extends BClient {
	config = config;
	commands = new Collection<CommandAliasName, BaseCommand>();
	rest: REST;

	constructor(token: string) {
		super({
			intents: [
				IntentsBitField.Flags.GuildScheduledEvents,
				IntentsBitField.Flags.Guilds
			]
		});
		this.rest = new REST({
			version: '10'
		}).setToken(token);
		this.token = token;
		loadEvents(this);
	}
}