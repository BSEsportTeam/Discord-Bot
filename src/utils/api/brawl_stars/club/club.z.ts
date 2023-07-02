import {z} from 'zod';

export const playerIconSchema = z.object({
	id: z.number(),
});

export const clubMemberSchema = z.object({
	icon: playerIconSchema,
	tag: z.string(),
	name: z.string(),
	trophies: z.number(),
	role: z.string().optional(),
	nameColor: z.string(),
});

export const clubSchema = z.object({
	tag: z.string(),
	name: z.string(),
	description: z.string(),
	trophies: z.number(),
	requiredTrophies: z.number(),
	members: z.array(clubMemberSchema),
	type: z.enum(['open', 'inviteOnly', 'closed', 'unknown']),
	badgeId: z.number(),
});