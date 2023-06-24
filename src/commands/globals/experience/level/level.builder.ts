import {commandsConfig} from '$core/config/message/command/commands.config';
import {SlashCommandBuilder} from 'discord.js';

const config = commandsConfig.level;

export const builder = new SlashCommandBuilder()
	.setName(config.name)
	.setDescription(config.description)
	.setDMPermission(false)
	.addUserOption(userOption => userOption
		.setName(config.options.member.name)
		.setDescription(config.options.member.description)
		.setRequired(false));