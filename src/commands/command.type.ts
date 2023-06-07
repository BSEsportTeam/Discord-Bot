import type {GuildName} from '$core/config/servers/servers.type';
import type {Client} from '$core/client';
import type {BaseCommand} from '$core/commands/base_command.class';
import type {ChatInputCommandInteraction} from 'discord.js';
import type {Result} from 'rustic-error';
import type {CommandError} from 'src/utils/error';
import type {SubCommand} from 'src/commands/sub_command.class';

export type GuildAlias = 'all' | GuildName;

export type CommandCreateFunc = (client: Client) => BaseCommand|SubCommand;

export type SubCommandGroup = {[key: string]: SubCommand};

export type SubCommandOptions = {[key: string]: SubCommand|SubCommandGroup};

export interface NormalCommand extends BaseCommand {
	run(interaction: ChatInputCommandInteraction): Promise<Result<boolean, CommandError>>
}
export interface SubsCommand extends BaseCommand {
	getSubCommands(): SubCommandGroup;
}
export interface UnknownCommand extends BaseCommand {
	run?(interaction: ChatInputCommandInteraction): Promise<Result<boolean, CommandError>>;
	getSubCommands?(): SubCommandOptions;
}

export type CommandPreReply = {
	enable: boolean;
	ephemeral: boolean;

}