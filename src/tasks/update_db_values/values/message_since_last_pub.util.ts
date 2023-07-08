import {Collection} from 'discord.js';
import type {Snowflake} from 'discord-api-types/globals';

const messagesSinceLastPub = new Collection<Snowflake, number>();

export const addMessageSinceLastPub = (guildId: Snowflake) => {
	const messages = messagesSinceLastPub.get(guildId) || 0;
	messagesSinceLastPub.set(guildId, messages + 1);
};

export const getAllValuesForPubMessage = () => {
	const infos = messagesSinceLastPub.clone();
	messagesSinceLastPub.clear();
	return infos;
};