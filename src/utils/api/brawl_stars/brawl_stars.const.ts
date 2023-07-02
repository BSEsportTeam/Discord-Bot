export const BASE_URL = 'https://bsproxy.royaleapi.dev/v1';

export const URLS = {
	club: (tag: string) => `/clubs/${tag}`,
	clubsRankings: (local: string) => `/rankings/${local}/clubs`
};