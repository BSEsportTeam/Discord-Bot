import {SlashCommandBuilder} from 'discord.js';
import {commandsConfig} from '$core/config/message/command';

const config = commandsConfig.admin;

export const builder = new SlashCommandBuilder()
	.setDefaultMemberPermissions(0)
	.setName(config.name)
	.setDescription(config.description)
	.setDMPermission(false)
	.addSubcommand(subCommand => subCommand
		.setName(config.subcmds.reverse_xp_movement.name)
		.setDescription(config.subcmds.reverse_xp_movement.description));