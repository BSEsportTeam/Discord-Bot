import {SlashCommandBuilder} from 'discord.js';
import {commandsConfig} from '$core/config/message/command';

const config = commandsConfig.admin;

export const builder = new SlashCommandBuilder()
	.setDefaultMemberPermissions(0)
	.setName(config.name)
	.setDescription(config.description)
	.setDMPermission(false)
	.addSubcommand(subCommand => subCommand
		.setName(config.subcmds.reverseXpMovement.name)
		.setDescription(config.subcmds.reverseXpMovement.description)
		.addIntegerOption(option => option.setName(config.subcmds.reverseXpMovement.options.id.name)
			.setDescription(config.subcmds.reverseXpMovement.options.id.description)
			.setRequired(true)));