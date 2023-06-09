import type {ChatInputCommandInteraction} from 'discord.js';
import {client} from '$core/index';
import {errorEmbed} from '$core/utils/embet';
import {messageConfig} from '$core/config/message/message.config';
import {resultify} from 'rustic-error';
import {logger} from '$core/utils/logger';
import {forground256Color} from 'tintify';
import type {NormalCommand} from '$core/commands/command.type';
import type {SubCommand} from '$core/commands/sub_command.class';
import {serializeCommandName} from '$core/handlers/commands/command.util';
import {getGuildWithId} from '$core/config/guilds';
import {isDev} from '$core/utils/environements';

export const getCommand = (interaction: ChatInputCommandInteraction): NormalCommand | SubCommand | null => {
	if (isDev) {
		let command = client.commands.get(serializeCommandName(
			interaction.commandName,
			'all',
			interaction.options.getSubcommand(false) || undefined,
			interaction.options.getSubcommandGroup() || undefined,
		));

		if (typeof command === 'undefined') {
			command = client.commands.get(serializeCommandName(
				interaction.commandName,
				'global',
				interaction.options.getSubcommand(false) || undefined,
				interaction.options.getSubcommandGroup() || undefined,
			));
		}

		return command || null;
	}

	if (interaction.inGuild() && interaction.guild !== null) {
		let command = client.commands.get(serializeCommandName(
			interaction.commandName,
			getGuildWithId(interaction.guild.id)?.name || 'all',
			interaction.options.getSubcommand(false) || undefined,
			interaction.options.getSubcommandGroup() || undefined,
		));

		if (typeof command === 'undefined') {
			command = client.commands.get(serializeCommandName(
				interaction.commandName,
				'all',
				interaction.options.getSubcommand(false) || undefined,
				interaction.options.getSubcommandGroup() || undefined,
			));
		}

		if (typeof command !== 'undefined') {
			return command;
		}

	} else {
		const command = client.commands.get(serializeCommandName(
			interaction.commandName,
			'all',
			interaction.options.getSubcommand(false) || undefined,
			interaction.options.getSubcommandGroup() || undefined,
		));
		if (typeof command !== 'undefined') {
			return command;
		}
	}
	return null;
};

export const replyError = async (interaction: ChatInputCommandInteraction, ephemeral: boolean, preReplied: boolean) => {
	if (preReplied) {

		const result = await resultify(() => interaction.editReply({
			embeds: [errorEmbed(messageConfig.commandHandler.error.description, messageConfig.commandHandler.error.title)]
		}));

		if (!result.ok) {
			logger.error('failed to command error editReply, error : ' + forground256Color(202) + result.error.message);
		}

	} else {
		const result = await resultify(() => interaction.reply({
			embeds: [errorEmbed(messageConfig.commandHandler.error.description, messageConfig.commandHandler.error.title)],
			ephemeral: ephemeral
		}));

		if (!result.ok) {
			logger.error('failed to command error reply, error : ' + forground256Color(202) + result.error.message);
		}
	}
};