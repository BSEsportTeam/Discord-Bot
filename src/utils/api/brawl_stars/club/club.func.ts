import type {Result} from 'rustic-error';
import type {BrawlStarsApiError} from '$core/utils/api/brawl_stars/brawl_stars_error.class';
import type {Club} from '$core/utils/api/brawl_stars/club/club.type';
import {fixTag, request} from '$core/utils/api/brawl_stars/brawl_stars.util';
import {URLS} from '$core/utils/api/brawl_stars/brawl_stars.const';
import {clubSchema} from '$core/utils/api/brawl_stars/club/club.z';

export const getApiClub = (tag: string): Promise<Result<Club, BrawlStarsApiError>> => {
  return request(URLS.club(fixTag(tag)), clubSchema);
};