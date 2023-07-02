import type {CommandString, GuildAlias, NormalCommand, SubsCommand} from '$core/handlers/commands/command.type';
import type {BaseCommand} from '$core/handlers/commands/base_command.class';
import type {ChatInputCommandInteraction, InteractionDeferReplyOptions, InteractionReplyOptions} from 'discord.js';
import type {Result} from 'rustic-error';
import {error, ok, resultify} from 'rustic-error';
import {CommandError} from '$core/utils/error';
import {isDev} from '$core/config/env';

export const serializeCommandName = (commandName: string, guild: GuildAlias, subCommand?: string, subCommandGroup?: string ): CommandString => {
	let command: CommandString = `${isDev ? (guild === 'all' ? 'all' : 'global') : guild}.${commandName}`;
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

export const sendCommandReply = async (interaction: ChatInputCommandInteraction, options: InteractionReplyOptions|InteractionDeferReplyOptions, defer: boolean):
	Promise<Result<boolean, CommandError>> => {

	if (defer) {
		const result = await resultify(() => interaction.deferReply(options));

		if (!result.ok) {
			return error(new CommandError('failed to reply to interaction' , interaction, result.error));
		}

		return ok(true);
	}
	const result = await resultify(() => interaction.reply(options));

	if (!result.ok) {
		return error(new CommandError('failed to reply to interaction' , interaction, result.error));
	}

	return ok(true);
};