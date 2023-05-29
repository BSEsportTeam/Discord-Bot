import type {Client} from '$core/Client';
import type {ChatInputCommandInteraction} from 'discord.js';
import type {BaseCommand} from '$core/commands/BaseCommand';
import {errorEmbed} from '$core/utils/embet';
import {commandConfig} from '$core/config/messages/command.config';
import {logger} from '$core/utils/logger';
import {effect, effectReset, forground256Color} from 'tintify';

export const runCommand = async (client: Client, interaction: ChatInputCommandInteraction): Promise<void> => {
	let command: BaseCommand|undefined;
	if (interaction.inGuild()) {
		command = client.commands.get(interaction.guildId + '-' + interaction.commandName);
		if (typeof command === 'undefined') command = client.commands.get(interaction.commandName);
	} else {
		command = client.commands.get(interaction.commandName);
	}
	if (typeof command === 'undefined') return;
	if (command.preReply.enable) await interaction.deferReply().catch(e => {
		logger.error('failed to deferReply a command, error : '  + forground256Color(202) + (e instanceof Error ? e.message : String(e)));
	});
	const result = await command.run(interaction);
	if (!result.ok) {
		if (command.preReply.enable) await interaction.editReply({
			embeds: [errorEmbed(commandConfig.error)]
		}).catch(e => {
			logger.error('failed to command error reply, error : ' + forground256Color(202) + (e instanceof Error ? e.message : String(e)));
		});
		else await interaction.reply({
			embeds: [errorEmbed(commandConfig.error)],
			ephemeral: true,
		}).catch(e => {
			logger.error('failed to command error reply, error : ' + forground256Color(202) + (e instanceof Error ? e.message : String(e)));
		});
		logger.error(`Error with command ${effect.bold+command.builder.name.toLocaleUpperCase()+effectReset.bold} : ${forground256Color(202)}${result.error.message}`);
		logger.debugValues(result.error.debug());
	}
};