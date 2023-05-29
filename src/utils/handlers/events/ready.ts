import type {Client} from '$core/Client';
import {loadCommands} from '$core/utils/handlers/commands/commands';
import {logger} from '$core/utils/logger';

export const ready = async (client: Client) => {
	await loadCommands(client);
	logger.info('BSE Bot is ready !');
};