import type {servers} from '$core/config/servers/servers.type';
import type {Client} from '$core/client';
import type {BaseCommand} from '$core/commands/base_command.class';

export type Guilds = 'all' | servers

export type CommandCreateFunc = (client: Client) => BaseCommand;