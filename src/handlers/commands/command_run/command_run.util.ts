import type {BaseCommand} from '$core/commands/base_command.class';
import type {ChatInputCommandInteraction} from 'discord.js';
import {client} from '$core/index';
import {errorEmbed} from '$core/utils/embet';
import {commandConfig} from '$core/config/messages/command.config';
import {resultify} from 'rustic-error';
import {logger} from '$core/utils/logger';
import {forground256Color} from 'tintify';

export const getCommand = (interaction: ChatInputCommandInteraction): BaseCommand|null => {
	if (interaction.inGuild() && interaction.guild !== null) {

		let command = client.commands.get(interaction.guildId + '-' + interaction.commandName);

		if (typeof command === 'undefined') {
			command = client.commands.get(interaction.commandName);
		}

		if (typeof command !== 'undefined') {
			return command;
		}

	} else {
		const command = client.commands.get(interaction.commandName);

		if (typeof  command !== 'undefined') {
			return command;
		}
	}
	return null;
};

export const replyError = async (interaction: ChatInputCommandInteraction, ephemeral: boolean, preReplied: boolean) => {
	if (preReplied) {

		const result = await resultify(() => interaction.editReply({
			embeds: [errorEmbed(commandConfig.error.description, commandConfig.error.title)]
		}));

		if (!result.ok) {
			logger.error('failed to command error editReply, error : ' + forground256Color(202) + result.error.message);
		}

	} else {
		const result = await resultify(() => interaction.reply({
			embeds: [errorEmbed(commandConfig.error.description, commandConfig.error.title)],
			ephemeral: ephemeral
		}));

		if (!result.ok) {
			logger.error('failed to command error reply, error : ' + forground256Color(202) + result.error.message);
		}
	}
};