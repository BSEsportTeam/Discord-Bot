import type {CommandBuilt, GuildsCommandsBuild} from 'src/handlers/commands/command_load/command_load.type';
import {isDev} from 'src/utils/environements';
import {resultify} from 'rustic-error';
import {client} from 'src/index';
import {Routes} from 'discord-api-types/v10';
import {devConfig} from 'src/config/dev.config';
import {logger} from 'src/utils/logger';
import {getArrayMergedFromCollectionValues} from 'src/utils/function/collection/collection.util';

export const loadCommands = async (globalCommands:  CommandBuilt[], guildCommands: GuildsCommandsBuild) => {
	const clientId = client.user?.id || 'error';

	if (isDev) {
		const result = await resultify(() => client.rest.put(Routes.applicationGuildCommands(clientId, devConfig.servers.serverMain.serverId), {
			body: globalCommands
		}));

		if (!result.ok) {
			logger.fatal('failed to put global commands, error : ' + result.error.message);
		}

		logger.info(`register ${guildCommands.size} globals commands (in dev) with success`);

		const commands = getArrayMergedFromCollectionValues(guildCommands);
	}
};