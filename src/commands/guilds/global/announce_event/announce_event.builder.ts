import {commandsConfig} from '$core/config/message/command/commands.config';
import {SlashCommandBuilder} from 'discord.js';

const config = commandsConfig.announceEvent;

export const builder = new SlashCommandBuilder()
	.setName(config.name)
	.setDescription(config.description)
	.setDMPermission(false)
	.setDefaultMemberPermissions(0)
	.addStringOption(stringOption => stringOption
		.setName(config.options.link.name)
		.setRequired(true)
		.setDescription(config.options.link.description)
		.setMinLength(10));