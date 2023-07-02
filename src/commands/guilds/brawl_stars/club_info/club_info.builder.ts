import {SlashCommandBuilder} from 'discord.js';
import {commandsConfig} from '$core/config/message/command';
import {getChoices} from '$core/commands/guilds/brawl_stars/club_info/club_info.util';

const config = commandsConfig.clubInfo;

export const builder = new SlashCommandBuilder()
	.setName(config.name)
	.setDescription(config.description)
	.setDMPermission(false)
	.addStringOption(stringOption => stringOption
		.setName(config.options.club.name)
		.setDescription(config.options.club.description)
		.setRequired(true)
		.addChoices(...getChoices()));