import type {ClubType} from 'brawlstars';

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