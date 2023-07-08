import type {ChatInputCommandInteraction, Collection} from 'discord.js';
import type {SubCommand} from '$core/handlers/commands/sub_command.class';
import type {GuildName} from '$core/config/guilds';
import type {BaseCommand} from '$core/handlers/commands/base_command.class';
import type {Result} from 'rustic-error';
import type {CommandError} from '$core/utils/error';

export type GuildAlias = 'all' | GuildName;

export type SubCommandGroup = {[key: string]: SubCommand};

export type SubCommandOptions = {[key: string]: SubCommand|SubCommandGroup};

export interface NormalCommand extends BaseCommand {
	run(interaction: ChatInputCommandInteraction): Promise<Result<boolean, CommandError>>
}
export interface SubsCommand extends BaseCommand {
	getSubCommands(): SubCommandOptions;
}
export interface UnknownCommand extends BaseCommand {
	run?(interaction: ChatInputCommandInteraction): Promise<Result<boolean, CommandError>>;
	getSubCommands?(): SubCommandOptions;
}

export type CommandPreReply = {
	enable: boolean;
	ephemeral: boolean;

}

export type CommandString = `${GuildAlias}.${string}`;

export type CommandCollection = Collection<CommandString, NormalCommand|SubCommand>;