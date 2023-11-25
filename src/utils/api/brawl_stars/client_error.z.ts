import {z} from 'zod';

export const clientErrorDetailSchema = z.object({});

export const clientErrorSchema = z.object({
	reason: z.string().optional(),
	message: z.string().optional(),
	type: z.string().optional(),
	detail: clientErrorDetailSchema.optional(),
});