import {z} from 'zod';

export const clubRankingSchema = z.object({
	tag: z.string(),
	name: z.string(),
	trophies: z.number(),
	rank: z.number(),
	memberCount: z.number(),
	badgeId: z.number(),
});

export const clubRankingListSchema = z.array(clubRankingSchema);

export const requestClubRankingListSchema = z.object({
	items: clubRankingListSchema
});