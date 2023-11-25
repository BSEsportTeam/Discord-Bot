import type {CommandPreReply} from '$core/handlers/commands';
import {sendCommandReply, SubCommand} from '$core/handlers/commands';
import {CommandError} from '$core/utils/error';
import type {Result} from 'rustic-error';
import {error, ok} from 'rustic-error';
import type {ChatInputCommandInteraction} from 'discord.js';
import {commandsConfig} from '$core/config/message/command';
import {addXp} from '$core/utils/xp';
import {XpMovementCause} from '@prisma/client';
import {msgParams} from '$core/utils/function/string';
import {simpleEmbed} from '$core/utils/discord/';

const config = commandsConfig.adminXp;
export class AdminXpAdd extends SubCommand {

	preReply: CommandPreReply = {
		ephemeral: false,
		enable: true,
	};

	name = config.subcmds.add.name;

	async run(interaction: ChatInputCommandInteraction): Promise<Result<boolean, CommandError>> {
		if (!interaction.inGuild() || interaction.guild === null || interaction.channel === null) return ok(false);

		const xp = interaction.options.getInteger(config.subcmds.add.options.xp.name);
		if (!xp) {
			return error(new CommandError('No value in option xp', interaction));
		}

		const user = interaction.options.getUser(config.subcmds.add.options.member.name);
		if (!user) {
			return error(new CommandError('No value in option user', interaction));
		}

		const reason = interaction.options.getString(config.subcmds.add.options.reason.name) || 'unknown';

		const xpResult = await addXp(user.id, interaction.guildId, xp, XpMovementCause.ADMINXP, interaction.user.id, reason);
		if (!xpResult.ok || xpResult.value === null) {
			return error(new CommandError(`failed to add xp to user ${user.username}( ${user.id})`, interaction, xpResult.ok ? undefined : xpResult.error));
		}


		const embed = simpleEmbed(
			msgParams(config.exec.add.succes.description, [xp, user.toString(), xpResult.value.level, xpResult.value.xp])
			+ (reason !== 'unknown' ? msgParams(config.exec.add.succes.reason, [reason]) : '')
		).setAuthor({
			name: config.exec.add.succes.title,
			iconURL: interaction.guild.iconURL() || undefined,
		});

		return sendCommandReply(interaction, {
			embeds: [embed],
		}, true);
	}

}