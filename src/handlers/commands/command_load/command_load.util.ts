import type {CommandBuilt, GuildsCommandsBuild} from 'src/handlers/commands/command_load/command_load.type';
import {isDev} from 'src/utils/environements';
import {resultify} from 'rustic-error';
import {client} from 'src/index';
import {Routes} from 'discord-api-types/v10';
import {devConfig} from '$core/config/guilds/_dev/dev.config';
import {logger} from 'src/utils/logger';
import {getArrayMergedFromCollectionValues} from 'src/utils/function/collection/collection.util';
import {guildsConfig} from '$core/config/guilds';

export const loadCommands = async (globalCommands:  CommandBuilt[], guildsCommands: GuildsCommandsBuild) => {
	const clientId = client.user?.id || 'error';
	if (isDev) {
		const result = await resultify(() => client.rest.put(Routes.applicationGuildCommands(clientId, devConfig.guilds.guildMain.guildId), {
			body: globalCommands
		}));

		if (!result.ok) {
			logger.fatal('failed to put global commands, error : ' + result.error.message);
		}

		logger.info(`register ${globalCommands.length} globals commands (in dev) with success`);

		const commands: CommandBuilt[] = getArrayMergedFromCollectionValues(guildsCommands);

		const result2 = await resultify(() => client.rest.put(Routes.applicationGuildCommands(clientId, devConfig.guilds.guildSection.guildId), {
			body: commands
		}));

		if (!result2.ok) {
			logger.fatal('failed to put section commands, error : ' + result2.error.message);
		}

		logger.info(`register ${commands.length} section commands (in dev) with success`);
	} else {

		const result = await resultify(() => client.rest.put(Routes.applicationCommands(clientId), {
			body: globalCommands
		}));

		if (!result.ok) {
			logger.fatal('failed to put global commands, error : ' + result.error.message);
		}

		logger.info(`register ${globalCommands.length} globals commands with success`);

		for (const [name, guildCommands] of guildsCommands.entries()) {
			const result2 = await resultify(() => client.rest.put(Routes.applicationGuildCommands(clientId, guildsConfig[name].guildId), {
				body: guildCommands
			}));

			if (!result2.ok) {
				logger.fatal(`failed to put section commands for server ${name} (${guildsConfig[name].guildId}), error : ${result2.error.message}`);
			}

			logger.info(`register ${guildCommands.length} section commands for server ${name} (${guildsConfig[name].guildId}) with success`);
		}

	}
};

