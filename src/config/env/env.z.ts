import {z} from 'zod';

export const envDTO = z.object({
	TOKEN: z.string().nonempty(),
	BRAWL_STARS_TOKEN: z.string().nonempty()
});