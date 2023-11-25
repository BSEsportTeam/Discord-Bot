import type {BrawlStarsClub} from '$core/config/guilds';
import {BrawlStarsClubType, guildsConfig} from '$core/config/guilds';
import type {APIApplicationCommandOptionChoice} from 'discord.js';
import type {ClubInfos} from '$core/commands/guilds/brawl_stars/club_info/club_info.type';
import type {Result} from 'rustic-error';
import {error, ok} from 'rustic-error';
import {GLOBAL_RANK, LOCAL_RANK} from '$core/commands/guilds/brawl_stars/club_info/club_info.const';
import {commandsConfig} from '$core/config/message/command';
import {msgParams} from '$core/utils/function/string';
import {getApiClub} from '$core/utils/api/brawl_stars/club/club.func';
import {getApiClubRanking} from '$core/utils/api/brawl_stars/ranking/club_ranking.func';
import type {BrawlStarsApiError} from '$core/utils/api/brawl_stars/brawl_stars_error.class';

const brawlStarsGuildConfig = guildsConfig.brawlStars;

export const getChoices = () => {
	const choices: APIApplicationCommandOptionChoice<string>[] = [];

	for (const club of brawlStarsGuildConfig.clubs) {
		choices.push({
			name: club.name,
			value: club.name,
		});
	}
	return choices;
};

export const getClubInfos = async (tag: string, localTop = false, globalTop = false): Promise<Result<ClubInfos, BrawlStarsApiError>> => {
	const clubResult = await getApiClub(tag);
	if (!clubResult.ok) {
		return error(clubResult.error);
	}

	const baseInfo: ClubInfos = {
		tag: clubResult.value.tag,
		name: clubResult.value.name,
		description: clubResult.value.description,
		requiredTrophies: clubResult.value.requiredTrophies,
		trophies: clubResult.value.trophies,
		memberCount: clubResult.value.members.length,
		type: clubResult.value.type,
	};

	if (localTop) {
		const localTopResult = await getApiClubRanking(LOCAL_RANK);
		if (!localTopResult.ok) {
			return error(localTopResult.error);
		}
		baseInfo.topLocal = localTopResult.value.find(v => v.tag === `#${tag}`)?.rank || 0;
	}

	if (globalTop) {
		const globalTopResult = await getApiClubRanking(GLOBAL_RANK);
		if (!globalTopResult.ok) {
			return error(globalTopResult.error);
		}

		baseInfo.topGlobal = globalTopResult.value.find(v => v.tag === `#${tag}`)?.rank || 0;
	}

	return ok(baseInfo);
};

export const getClubConfig = (name: string): BrawlStarsClub | undefined => {
	return brawlStarsGuildConfig.clubs.find(v => v.name === name);
};

export const clubTypeToString = (type: BrawlStarsClubType): string => {
	switch (type) {
	case BrawlStarsClubType.LADDER:
		return commandsConfig.clubInfo.exec.clubInfos.basic.values.types.leader;
	case BrawlStarsClubType.LDC:
		return commandsConfig.clubInfo.exec.clubInfos.basic.values.types.ldc;
	case BrawlStarsClubType.CHILL:
		return commandsConfig.clubInfo.exec.clubInfos.basic.values.types.chill;
	default:
		return 'error';
	}
};

export const clubRankToString = (rank: number): string => {
	if (rank <= 0) {
		return commandsConfig.clubInfo.exec.clubInfos.rank.rankValue.noRanked;
	}
	return msgParams(commandsConfig.clubInfo.exec.clubInfos.rank.rankValue.ranked, [rank]);
};