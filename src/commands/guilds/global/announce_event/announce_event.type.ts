import type {Snowflake} from 'discord-api-types/globals';

export type MessageReference = {
	messageId: Snowflake,
	channelId?: Snowflake
}