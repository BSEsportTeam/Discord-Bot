import type {BrawlStarsApiError} from '$core/utils/api/brawl_stars/brawl_stars_error.class';
import type {Result} from 'rustic-error';
import {error, ok} from 'rustic-error';
import type {ClubRanking} from '$core/utils/api/brawl_stars/ranking/club_ranking.type';
import {request} from '$core/utils/api/brawl_stars/brawl_stars.util';
import {URLS} from '$core/utils/api/brawl_stars/brawl_stars.const';
import {requestClubRankingListSchema} from '$core/utils/api/brawl_stars/ranking/club_ranking.z';

export const getApiClubRanking = async (local: string): Promise<Result<ClubRanking, BrawlStarsApiError>> => {
  const result = await request(URLS.clubsRankings(local), requestClubRankingListSchema);
  if (!result.ok) {
    return error(result.error);
  }

  return ok(result.value.items);
};