import type {NewsChannel, TextChannel} from 'discord.js';
import type {Snowflake} from 'discord-api-types/globals';
import type {Result} from 'rustic-error';
import {error, ok, resultify} from 'rustic-error';
import {client} from '$core/index';
import {isMessageChannel} from './channel.util';

export const getMessageChannel = async (guildId: Snowflake, channelId: Snowflake, system = 'unknown'): Promise<Result<TextChannel | NewsChannel, Error>> => {
	const guild = client.guilds.cache.get(guildId);

	if (typeof guild === 'undefined') {
		return error(new Error(`failed to find cache for guild ${guildId} for system ${system}`));
	}

	const channelResult = await resultify(() => guild.channels.fetch(channelId));

	if (!channelResult.ok) {
		return error(new Error(`failed to fetch channel for system ${system} with id ${channelId} for guild ${guildId}, error : ${channelResult.error.message}`));
	}

	const channel = channelResult.value;
	if (channel === null) {
		return error(new Error(`channel for system ${system} with id ${channelId} not found in ${guildId}\``));
	}

	if (!isMessageChannel(channel)) {
		return error(new Error(`invalid type of channel for system ${system} with id ${channelId}  in ${guildId}`));
	}

	return ok(channel);
};