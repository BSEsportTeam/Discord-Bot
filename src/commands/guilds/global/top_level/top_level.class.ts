import {BaseCommand, sendCommandReply} from '$core/handlers/commands';
import {builder} from './top_level.builder';
import type {ChatInputCommandInteraction, InteractionReplyOptions} from 'discord.js';
import {userMention} from 'discord.js';
import type {Result} from 'rustic-error';
import {error, ok} from 'rustic-error';
import {CommandError} from '$core/utils/error';
import {commandsConfig} from '$core/config/message/command';
import {Dev} from '$core/utils/dev';
import {getGlobalPositionAndXp, getGlobalTop, getGuildPositionAndXp, getGuildTop} from '$core/handlers/database/xp';
import {msgParams} from '$core/utils/function/string';
import {calculateLevel} from '$core/utils/xp';
import {simpleEmbed} from '$core/utils/discord';
import {getButton} from '$core/commands/guilds/global/top_level/top_level.util';
import {PageTypes} from '$core/utils/xp/page/page.type';
import {generatePage} from '$core/utils/xp/page/page';


const config = commandsConfig.topLevel;
@Dev
export default class TopLevel extends BaseCommand {
	builder = builder.toJSON();

	async run(interaction: ChatInputCommandInteraction): Promise<Result<boolean, CommandError>> {
		if (!interaction.inGuild() || interaction.guild === null || interaction.channel === null || interaction.member === null) return ok(false);

		const isGlobal = interaction.options.getBoolean(config.options.global.name, false) || false;
		const page = interaction.options.getInteger(config.options.page.name) || 0;

		let message: InteractionReplyOptions;

		if (page === 0) {
			const top3Result = await (isGlobal ? getGlobalTop(0, 3) : getGuildTop(interaction.guildId, 0, 3));
			if (!top3Result.ok) {
				return error(new CommandError('failed to get top 3 on database', interaction, top3Result.error));
			}
			let description = msgParams(config.exec.simpled.description, [
				userMention(top3Result.value[0].id), calculateLevel(top3Result.value[0].xp), top3Result.value[0].xp,
				userMention(top3Result.value[1].id), calculateLevel(top3Result.value[1].xp), top3Result.value[1].xp,
				userMention(top3Result.value[2].id), calculateLevel(top3Result.value[2].xp), top3Result.value[2].xp
			]);

			if (!top3Result.value.find((v => v.id === interaction.user.id))) {
				const infoResult = await (isGlobal ? getGlobalPositionAndXp(interaction.user.id) : getGuildPositionAndXp(interaction.user.id, interaction.guildId));
				if (!infoResult.ok) {
					return error(new CommandError('failed to get info user', interaction, infoResult.error));
				}
				description += msgParams(config.exec.simpled.selfTop,
					[infoResult.value.position, userMention(interaction.user.id), calculateLevel(infoResult.value.xp), infoResult.value.xp]);
			}

			const embed = simpleEmbed(description, isGlobal ? config.exec.simpled.titleGlobal : config.exec.simpled.titleGuild);

			message = {
				embeds: [embed],
				components: getButton(isGlobal ? PageTypes.GLOBAL : PageTypes.GUILD)
			};
		} else {
			const dataResult = await (isGlobal ? getGlobalTop((page - 1) * 10, 11) : getGuildTop(interaction.guildId, (page - 1) * 10, 11));
			if (!dataResult.ok) {
				return error(new CommandError(`failed to get ${isGlobal ? 'global' : 'guild'} top`, interaction, dataResult.error));
			}

			message = generatePage(page, dataResult.value, isGlobal ? PageTypes.GLOBAL : PageTypes.GUILD);
		}


		return sendCommandReply(interaction, message, false);
	}
}