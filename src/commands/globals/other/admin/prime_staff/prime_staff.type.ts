import type {Snowflake} from 'discord-api-types/globals';

export type PrimeInfos = {
	username: string;
	role: string;
	prime: number;
	associationPrime: number;
	totalPrime: number;
	userId: Snowflake;
}