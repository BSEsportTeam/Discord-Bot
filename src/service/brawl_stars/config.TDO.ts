import {z} from 'zod';

export const brawlStarsConfig = z.object({
  announcementChannel: z.string().regex(/^(\d{15,25})$/),
});