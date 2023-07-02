import type {Snowflake} from 'discord-api-types/globals';
import type {Result} from 'rustic-error';
import {error, ok, resultify} from 'rustic-error';
import {getGuild} from '$core/utils/discord/guild/guild.func';
import type {GuildMember} from 'discord.js';

export const getGuildMember = async (userId: Snowflake, guildId: Snowflake): Promise<Result<GuildMember, Error>> => {
	const guild = await getGuild(guildId);
	if (!guild.ok) return error(guild.error);
	const result = await resultify(() => guild.value.members.fetch(userId));
	if (result.ok) return ok(result.value);
	return error(result.error);
};
