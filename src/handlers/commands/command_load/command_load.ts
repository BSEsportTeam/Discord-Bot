import {client, mainDir} from '$core/index';
import {logger} from '$core/utils/logger';
import {BaseCommand} from '$core/commands/base_command.class';
import {COMMAND_PATHS} from '$core/handlers/commands/command_load/command_load.const';
import {existsSync, readdirSync, statSync} from 'fs';
import {sep} from 'path';
import type {GuildName} from '$core/config/servers/servers.type';
import {isDev} from '$core/utils/environements';
import {Routes} from 'discord-api-types/v10';
import {devConfig} from '$core/config/dev.config';
import {resultify} from 'rustic-error';
import {config} from '$core/config';

export const commandLoad = async () => {
	try {
		if (client.user === null) return logger.fatal('Loading command impossible, client not connected');
		const clientId = client.user.id;

		const globalCommands: BaseCommand[] = [];
		const serversCommands = new Map<GuildName, BaseCommand[]>();

		// load all commands from folders
		for (const basePath of COMMAND_PATHS) {
			const path = basePath(mainDir());
			const baseFolders = readdirSync(path);

			for (const baseFolder of baseFolders) {
				const folders = readdirSync(`${path}${sep}${baseFolder}${sep}`);

				for (const folder of folders) {
					const folderPath = `${path}${sep}${baseFolder}${sep}${folder}${sep}`;

					if (!statSync(folderPath).isDirectory()) {
						continue;
					}

					const commandFilePath = `${path}${sep}${baseFolder}${sep}${folder}${sep}${folder}.class.ts`;

					if (!existsSync(commandFilePath)) {
						logger.fatal(`no base file found for command ${folder} !`, ['full path : ' + commandFilePath]);
					}

					const commandImport = await import(commandFilePath);
					const command = commandImport.command;

					if (!command || typeof command === 'undefined') {
						logger.fatal(`no default export found for command ${folder} !`, ['full path : ' + commandFilePath]);
					}

					const commandClass = command(client);

					if (!(commandClass instanceof BaseCommand)) {
						logger.fatal(`class not extends BaseCommand for command ${folder} !`, ['full path : ' + commandFilePath]);
					}

					if (commandClass.guild === 'all') {
						globalCommands.push(commandClass);
						continue;
					}

					if (!serversCommands.has(command.guild)) {
						serversCommands.set(command.guild, []);
					}

					const commandList = serversCommands.get(command.guild);
					commandList!.push(commandClass);
					serversCommands.set(command.guild, commandList!);
				}
			}
		}

		if (isDev) {
			const result = await resultify(() => client.rest.put(Routes.applicationGuildCommands(clientId, devConfig.servers.serverMain.serverId), {
				body: globalCommands.map(b => b.builder)
			}));

			if (!result.ok) {
				logger.fatal('failed to put global commands, error : ' + result.error.message);
			}

			for (const command of globalCommands) {
				client.commands.set(command.builder.name, command);
			}

			logger.info(`Loaded globals commands (${globalCommands.length} commands)`);

			const commandsFull: BaseCommand[] = [];
			for (const server of serversCommands.values()) {
				commandsFull.push(...server);
			}

			const result2 = await resultify(() => client.rest.put(Routes.applicationGuildCommands(clientId, devConfig.servers.serverSection.serverId), {
				body: commandsFull.map(s => s.builder)
			}));

			if (!result2.ok) {
				logger.fatal('failed to put sections commands, error : ' + result2.error.message);
			}

			for (const command of commandsFull) {
				client.commands.set(devConfig.servers.serverSection.serverId + '-' + command.builder.name, command);
			}

			logger.info(`Loaded sections commands (${commandsFull.length} commands)`);
		} else {
			const result = await resultify(() => client.rest.put(Routes.applicationCommands(clientId), {
				body: globalCommands.map(b => b.builder)
			}));

			if (!result.ok) {
				logger.fatal('failed to put global commands, error : ' + result.error.message);
			}

			for (const command of globalCommands) {
				client.commands.set(command.builder.name, command);
			}

			logger.info(`Loaded globals commands (${globalCommands.length} commands)`);

			for (const server of serversCommands.keys()) {
				const result2 = await resultify(() => client.rest.put(Routes.applicationGuildCommands(clientId, config.servers[server].serverId), {
					body: serversCommands.get(server)!.map(b => b.builder)
				}));

				if (!result2.ok) {
					logger.fatal(`failed to put servers commands for server ${server}(${config.servers[server].serverId}), error : ${result2.error.message}`);
				}

				for (const command of serversCommands.get(server)!.values()) {
					client.commands.set(config.servers[server].serverId + '-' + command.builder.name, command);
				}

				logger.info(`loaded sections commands for server ${server} (${serversCommands.get(server)!.length} commands)`);
			}
		}
	} catch (e) {
		logger.fatal('failed to load commands, error : ' + (e instanceof Error ? e.message : `${e}`));
	}
};