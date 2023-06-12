import type {CommandString, GuildAlias, NormalCommand, SubsCommand} from '$core/handlers/commands/command.type';
import type {BaseCommand} from '$core/handlers/commands/base_command.class';

export const serializeCommandName = (commandName: string, guild: GuildAlias, subCommand?: string, subCommandGroup?: string ): CommandString => {
	let command: CommandString = `${guild}.${commandName}`;
	if (subCommand) command += `.${subCommand}`;
	if (subCommandGroup) command += `.${subCommandGroup}`;

	return command as CommandString;
};

export const isNormalCommand = (cmd: BaseCommand): cmd is NormalCommand => {
	return 'run' in cmd;
};
export const isSubCommands = (cmd: BaseCommand): cmd is SubsCommand => {
	return 'getSubCommands' in cmd;
};
