import type {ClubType} from '$core/utils/api/brawl_stars';

export type ClubInfos = {
	tag: string;
	name: string;
	description: string;
	requiredTrophies: number;
	trophies: number;
	memberCount: number;
	type: ClubType;
	topLocal?: number;
	topGlobal?: number;
}