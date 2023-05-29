import type {Client} from '$core/Client';
import {commands} from '$core/commands';
import type {BaseCommand} from '$core/commands/BaseCommand';
import type {servers} from '$core/config/servers/servers.type';
import {isDev} from '$core/utils/environements';
import {Routes} from 'discord-api-types/v10';
import {devConfig} from '$core/config/dev.config';
import {config} from '$core/config';
import {logger} from '$core/utils/logger';


export const loadCommands = async (client: Client) => {
	try {
		if (client.user === null) throw new Error('Client not connected');
		const globalCommads: BaseCommand[] = [];
		const serversCommands = new Map<servers, BaseCommand[]>();
		for (const commandClass of commands) {
			const command = new commandClass(client);
			if (command.guild === 'all') globalCommads.push(command);
			else {
				if (!serversCommands.has(command.guild)) serversCommands.set(command.guild, []);
				const commandList = serversCommands.get(command.guild);
				commandList!.push(command);
				serversCommands.set(command.guild, commandList!);
			}
		}

		if (isDev) {
			await client.rest.put(Routes.applicationGuildCommands(client.user.id, devConfig.servers.serverMain.serverId), {
				body: globalCommads.map(b => b.builder)
			});
			for (const command of globalCommads) {
				client.commands.set(command.builder.name, command);
			}
			logger.info(`Loaded globals commands (${globalCommads.length} commands)`);
			const commandsFull: BaseCommand[] = [];
			for (const server of serversCommands.values()) {
				commandsFull.push(...server);
			}
			for (const command of commandsFull) {
				client.commands.set(devConfig.servers.serverSection.serverId + '-' + command.builder.name, command);
			}
			await client.rest.put(Routes.applicationGuildCommands(client.user.id, devConfig.servers.serverSection.serverId), {
				body: commandsFull.map(s => s.builder)
			});
			logger.info(`Loaded sections commands (${commandsFull.length} commands)`);
		} else {
			await client.rest.put(Routes.applicationCommands(client.user.id), {
				body: globalCommads.map(b => b.builder)
			});
			for (const command of globalCommads) {
				client.commands.set(command.builder.name, command);
			}
			for (const server of serversCommands.keys()) {
				await client.rest.put(Routes.applicationGuildCommands(client.user.id, config.servers[server].serverId), {
					body: serversCommands.get(server)!.map(b => b.builder)
				});
				for (const command of serversCommands.get(server)!.values()) {
					client.commands.set(config.servers[server].serverId + '-' + command.builder.name, command);
				}
			}
		}
	} catch (e) {
		logger.fatal(e instanceof Error ? e.message : `${e}`);
	}
};