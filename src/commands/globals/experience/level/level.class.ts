import type {CommandPreReply} from '$core/handlers/commands';
import {BaseCommand, sendCommandReply} from '$core/handlers/commands';
import {builder} from '$core/commands/globals/experience/level/level.builder';
import type {ChatInputCommandInteraction} from 'discord.js';
import {GuildMember} from 'discord.js';
import type {Result} from 'rustic-error';
import {error, ok} from 'rustic-error';
import {CommandError} from '$core/utils/error';
import {commandsConfig} from '$core/config/message/command';
import {getGuildPosition, getGuildXp} from '$core/handlers/database/xp';
import {errorEmbed, getGuildMember, simpleEmbed} from '$core/utils/discord';
import {calculateLevel, getLevelProgress, getXpForLevel} from '$core/utils/xp';
import {msgParams} from '$core/utils/function/string';
import {Dev} from '$core/utils/dev';

const config = commandsConfig.level;

@Dev
export default class Level extends BaseCommand {
	builder = builder.toJSON();
	preReply: CommandPreReply = {
		enable: true,
		ephemeral: false
	};
	async run(interaction: ChatInputCommandInteraction): Promise<Result<boolean, CommandError>> {
		if (!interaction.inGuild() || interaction.guild === null || interaction.channel === null || interaction.member === null) return ok(false);

		const xp = await getGuildXp((interaction.options.getUser(config.options.member.name) || interaction.user).id, interaction.guildId);
		if (!xp.ok) {
			return error(new CommandError('failed to get xp info about user', interaction, xp.error));
		}

		if (xp.value === null) {
			return sendCommandReply(interaction, {embeds: [errorEmbed(config.exec.noUser)]}, false);
		}

		let member = interaction.options.getMember(config.options.member.name);

		if (!(member instanceof GuildMember)) {
			const memberResult = await getGuildMember(
				(interaction.options.getUser(config.options.member.name) || interaction.user).id,
				interaction.guildId
			);

			if (!memberResult.ok) {
				return error(new CommandError('failed to fetch guild member', interaction, memberResult.error));
			}
			member = memberResult.value;
		}


		const position = await getGuildPosition(member.id, interaction.guildId);
		if (!position.ok) {
			return error(new CommandError('failed to get xp position for user', interaction, position.error));
		}

		const level = calculateLevel(xp.value);
		const xpForLevel = getXpForLevel(level);
		const progress = getLevelProgress(xp.value);

		const embed = simpleEmbed(
			msgParams(config.exec.description, [level, xp.value, progress, xpForLevel, position.value]),
			msgParams(config.exec.title, [member.displayName])
		).setThumbnail(member.avatarURL() || member.user.avatarURL() || member.user.defaultAvatarURL);

		return sendCommandReply(interaction, {
			embeds: [embed]
		}, true);
	}
}