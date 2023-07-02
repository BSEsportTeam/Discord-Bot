import type {GuildAlias} from '$core/handlers/commands';
import {BaseCommand, sendCommandReply} from '$core/handlers/commands';
import {builder} from './club_info.builder';
import type {ChatInputCommandInteraction} from 'discord.js';
import {EmbedBuilder} from 'discord.js';
import type {Result} from 'rustic-error';
import type {CommandError} from '$core/utils/error';
import {commandsConfig} from '$core/config/message/command';
import {
	clubRankToString,
	clubTypeToString,
	getClubConfig,
	getClubInfos
} from '$core/commands/guilds/brawl_stars/club_info/club_info.util';
import {logger} from '$core/utils/logger';
import {errorEmbed} from '$core/utils/discord';
import {msgParams} from '$core/utils/function/string';
import {colors} from '$core/config/global';
import {MAX_MEMBER} from '$core/commands/guilds/brawl_stars/club_info/club_info.const';
import {Dev} from '$core/utils/dev';


const config = commandsConfig.clubInfo;
@Dev
export default class TopLevel extends BaseCommand {
	builder = builder.toJSON();
	guild: GuildAlias = 'brawlStars';

	async run(interaction: ChatInputCommandInteraction): Promise<Result<boolean, CommandError>> {
		const clubName = interaction.options.getString(config.options.club.name) || 'invalid';
		const clubConfig = getClubConfig(clubName);

		if (!clubConfig) {
			logger.error(`no brawl stars club fount with name ${clubName} in config`);
			return sendCommandReply(interaction, {
				embeds: [errorEmbed(config.exec.noClub.description, config.exec.noClub.title)]
			}, false);
		}

		const clubInfoResult = await getClubInfos(clubConfig.tag, clubConfig.localTop, clubConfig.globalTop);
		if (!clubInfoResult.ok) {
			logger.error(`Api Brawl stars error for fetching club info with tag ${clubConfig.tag} (${clubName}) error : ${clubInfoResult.error.message}`);
			logger.debugValues(clubInfoResult.error.debug());
			return sendCommandReply(interaction, {
				embeds: [errorEmbed(config.exec.apiError.description, config.exec.apiError.title)]
			}, false);
		}

		const exec = config.exec.clubInfos;
		let rankDescription = msgParams(exec.rank.description, [clubInfoResult.value.trophies]);

		if (clubConfig.bestGlobal) {
			rankDescription += msgParams(exec.rank.descriptionComplements.bestGlobal, [clubRankToString(clubConfig.bestGlobal)]);
		}

		if (clubConfig.globalTop) {
			rankDescription += msgParams(exec.rank.descriptionComplements.currentGlobal, [clubRankToString(clubInfoResult.value.topGlobal || 0)]);
		}

		if (clubConfig.bestLocal) {
			rankDescription += msgParams(exec.rank.descriptionComplements.bestLocal, [clubRankToString(clubConfig.bestLocal)]);
		}

		if (clubConfig.localTop) {
			rankDescription += msgParams(exec.rank.descriptionComplements.currentLocal, [clubRankToString(clubInfoResult.value.topLocal || 0)]);
		}

		const embed = new EmbedBuilder()
			.setTitle(msgParams(exec.title, [clubName]))
			.setColor(colors.bseColor1);

		embed.addFields({
			name: exec.basic.title,
			value: msgParams(exec.basic.description, [
				clubTypeToString(clubConfig.type),
				clubInfoResult.value.memberCount, MAX_MEMBER,
				clubInfoResult.value.requiredTrophies,
				exec.basic.values.access[clubInfoResult.value.type] || exec.basic.values.access.unknown
			]),
			inline: false
		},
		{
			name: exec.rank.title,
			value: rankDescription,
			inline: true
		});

		return sendCommandReply(interaction, {
			embeds: [embed]
		}, false);
	}
}