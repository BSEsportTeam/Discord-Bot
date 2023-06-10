import type {GuildAlias} from '$core/commands/command.type';
import type {CommandString} from '$core/handlers/commands/command.type';

export const serializeCommandName = (commandName: string, guild: GuildAlias, subCommand?: string, subCommandGroup?: string ): CommandString => {
	let command: CommandString = `${guild}.${commandName}`;
	if (subCommand) command += `.${subCommand}`;
	if (subCommandGroup) command += `.${subCommandGroup}`;

	return command as CommandString;
};