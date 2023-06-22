import {SlashCommandBuilder} from 'discord.js';
import {commandsConfig} from '$core/config/message/command';

const config = commandsConfig.topLevel;

export const builder = new SlashCommandBuilder()
	.setName(config.name)
	.setDescription(config.description)
	.setDMPermission(false)
	.addIntegerOption(numberOption => numberOption
		.setName(config.options.page.name)
		.setDescription(config.options.page.description)
		.setRequired(false)
		.setMinValue(1)
		.setMaxValue(1000))
	.addBooleanOption(booleanOption => booleanOption
		.setName(config.options.global.name)
		.setName(config.options.global.description)
		.setRequired(false));