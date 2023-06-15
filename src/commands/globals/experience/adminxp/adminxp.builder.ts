import {commandsConfig} from '$core/config/message/command';
import {SlashCommandBuilder} from 'discord.js';

const config = commandsConfig.adminXp;

export const builder = new SlashCommandBuilder()
	.setName(config.name)
	.setDescription(config.description)
	.setDMPermission(false)
	.setDefaultMemberPermissions(0)
	.addSubcommand(subCommand => subCommand
		.setName(config.subcmds.add.name)
		.setDescription(config.subcmds.add.description)
		.addUserOption(userOption => userOption
			.setName(config.subcmds.add.options.member.name)
			.setDescription(config.subcmds.add.options.member.description)
			.setRequired(true))
		.addIntegerOption(numberOption => numberOption
			.setName(config.subcmds.add.options.xp.name)
			.setDescription(config.subcmds.add.options.xp.description)
			.setRequired(true))
		.addStringOption(stringOption => stringOption
			.setName(config.subcmds.add.options.reason.name)
			.setDescription(config.subcmds.add.options.reason.description)
			.setRequired(false)))
	.addSubcommand(subCommand => subCommand
		.setName(config.subcmds.remove.name)
		.setDescription(config.subcmds.remove.description)
		.addUserOption(userOption => userOption
			.setName(config.subcmds.remove.options.member.name)
			.setDescription(config.subcmds.remove.options.member.description)
			.setRequired(true))
		.addIntegerOption(numberOption => numberOption
			.setName(config.subcmds.remove.options.xp.name)
			.setDescription(config.subcmds.remove.options.xp.description)
			.setRequired(true))
		.addStringOption(stringOption => stringOption
			.setName(config.subcmds.remove.options.reason.name)
			.setDescription(config.subcmds.remove.options.reason.description)
			.setRequired(false)));