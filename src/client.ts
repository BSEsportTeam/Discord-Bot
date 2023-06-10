import {Client as BClient, Collection, IntentsBitField, REST} from 'discord.js';
import type {CommandCollection} from '$core/handlers/commands/command.type';
import {eventLoad} from '$core/handlers/events/event';
import {commandLoad} from '$core/handlers/commands/command_load';
import {logger} from '$core/utils/logger';
import type {ButtonCollection} from '$core/handlers/buttons';
import {loadButtons} from '$core/handlers/buttons';

export class Client extends BClient {
	commands: CommandCollection = new Collection();
	rest: REST;
	buttons: ButtonCollection = new Collection();
	
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

		this.on('ready', () =>{
			void this.ready();
		});
	}

	async ready() {
		await eventLoad();
		await commandLoad();
		await loadButtons();
		logger.info('BSE Bot is ready !');
	}
}