import type {GuildName} from '$core/config/guilds';
import type {
	ChatInputCommandInteraction,
	MessageContextMenuCommandInteraction,
	UserContextMenuCommandInteraction
} from 'discord.js';
import type {CommandError} from '$core/utils/error';
import type {Command} from '$core/base/command/command.class';
import type {Service} from '$core/base/service/service.class';
import type {SubCommand} from '$core/base/command/sub_command.class';

export type CommandResultInfosPassed = {
	pass: true;
}
export type CommandResultInfoFailed = {
	pass: false;
	failedRaison: FailsReasons;
	detailed?: string;
}
export type CommandResultInfos = CommandResultInfosPassed | CommandResultInfoFailed;

export type FailsReasons = 'NO_PERMS' | 'VALUE_NOT_FOUND';

export type CommandResultErr = [CommandError, null];
export type CommandResultOk = [null, CommandResultInfos];
export type CommandResult = CommandResultErr | CommandResultOk;

export type GuildAlias = 'all' | GuildName;

export type CommandInteraction =
	ChatInputCommandInteraction
	| MessageContextMenuCommandInteraction
	| UserContextMenuCommandInteraction;

export interface ChatCommand<S extends Service> extends Command<S> {
	runChat(interaction: ChatInputCommandInteraction): Promise<CommandResult>;
}

export interface MessageCommand<S extends Service> extends Command<S> {
	runMessage(interaction: MessageContextMenuCommandInteraction): Promise<CommandResult>;
}

export interface ProfileCommand<S extends Service> extends Command<S> {
	runProfile(interaction: UserContextMenuCommandInteraction): Promise<CommandResult>;
}

export type SubCommandGroups<S extends Service> = Map<string, SubCommands<S>>
export type SubCommands<S extends Service> = Map<string, SubCommand<S>>
