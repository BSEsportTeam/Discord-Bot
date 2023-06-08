import type {GuildAlias} from '$core/commands/command.type';

export const serializeCommandName = (commandName: string, guild: GuildAlias, subCommand?: string, subCommandGroup?: string ): string => {
	let command = `${guild}.${commandName}`;
	if (subCommand) command += `.${subCommand}`;
	if (subCommandGroup) command += `.${subCommandGroup}`;

	return command;
};