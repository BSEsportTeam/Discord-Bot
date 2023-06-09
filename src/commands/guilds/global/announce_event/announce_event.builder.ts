import {commandsConfig} from '$core/config/message/command/commands.config';
import {SlashCommandBuilder, SlashCommandStringOption} from 'discord.js';

const config = commandsConfig.annonceevent;

export const builder = new SlashCommandBuilder()
	.setName(config.name)
	.setDescription(config.description)
	.setDMPermission(false)
	.setDefaultMemberPermissions(0)
	.addStringOption(new SlashCommandStringOption()
		.setName(config.options.link.name)
		.setRequired(true)
		.setDescription(config.options.link.description)
		.setMinLength(10));