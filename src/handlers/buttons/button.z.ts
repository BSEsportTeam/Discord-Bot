import {z} from 'zod';

export const ButtonHandlerSchema = z.object({
	id: z.string().nonempty(),
	name: z.string().nonempty(),
	authorOnly: z.boolean().default(true),
	guildOnly: z.boolean().default(true),
	autoDisable: z.boolean().default(false),
	preReply: z.boolean().default(false),
	run: z.function().args(z.any())
});
