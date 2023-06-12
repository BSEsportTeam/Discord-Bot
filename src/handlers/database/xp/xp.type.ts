import type {Snowflake} from 'discord-api-types/globals';

export type GlobalXPTop = {
	position: number;
	xp: number
	id: Snowflake;
}

export type GuildXPTop = {
	position: number;
	xp: number;
	id: Snowflake;
	displayName: string;
}