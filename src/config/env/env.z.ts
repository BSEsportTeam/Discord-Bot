import {z} from 'zod';

export const envDTO = z.object({
	TOKEN: z.string().nonempty()
});