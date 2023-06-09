import {Client as BClient, Collection, IntentsBitField, REST} from 'discord.js';
import {loadEvents} from '$core/handlers/events/loader';
import type {CommandCollection} from '$core/handlers/commands/command.type';

export class Client extends BClient {
	commands: CommandCollection = new Collection();
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