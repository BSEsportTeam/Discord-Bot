import {Collection} from 'discord.js';
import type {Snowflake} from 'discord-api-types/globals';
import type {DropTakeCollection} from '$core/handlers/buttons/dropxp/dropxp.type';

const takes: DropTakeCollection = new Collection();

export const setTake = (id: Snowflake) => {
	takes.set(id, true);
	setTimeout(() => {
		takes.delete(id);
	}, 120_000);
};

export const isTake = (id: Snowflake): boolean => {
	return takes.has(id);
};
