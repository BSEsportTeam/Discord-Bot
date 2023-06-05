import type {Client} from '$core/client';
import {logger} from '$core/utils/logger/logger.func';
import {commandLoad} from '$core/handlers/commands/command_load';

export const ready = async (client: Client) => {
	await commandLoad();
	logger.info('BSE Bot is ready !');
};