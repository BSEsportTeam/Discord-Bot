import {z} from 'zod';

export const envDTO = z.object({
  TOKEN: z.string().nonempty(),
  BRAWL_STARS_TOKEN: z.string().nonempty(),
  GOOGLE_MAIL: z.string().email().nonempty(),
  GOOGLE_PRIVATE_KEY: z.string().nonempty(),
  GOOGLE_SHEETS_ID: z.string().nonempty(),
  WEBHOOK_DISCORD_URL: z.string().nonempty(),
});