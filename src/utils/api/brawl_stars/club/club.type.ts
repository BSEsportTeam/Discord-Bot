import type {z} from 'zod';
import type {clubSchema, clubType} from '$core/utils/api/brawl_stars/club/club.z';

export type Club = z.infer<typeof clubSchema>
export type ClubType = z.infer<typeof clubType>