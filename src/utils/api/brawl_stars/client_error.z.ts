import {z} from 'zod';

export const clientErrorDetailSchema = z.object({});

export const clientErrorSchema = z.object({
	reason: z.string(),
	message: z.string(),
	type: z.string().optional(),
	detail: clientErrorDetailSchema.optional(),
});
