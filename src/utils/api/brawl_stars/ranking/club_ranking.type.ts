import type { z } from "zod";
import type { clubRankingListSchema } from "$core/utils/api/brawl_stars/ranking/club_ranking.z";

export type ClubRanking = z.infer<typeof clubRankingListSchema>;