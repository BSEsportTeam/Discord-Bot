import type {Snowflake} from 'discord-api-types/globals';
import {DatabaseError} from '$core/utils/error';
import type {Result} from 'rustic-error';
import {error, ok, resultify} from 'rustic-error';
import {getUser} from '$core/utils/discord/user';
import {getOrCreateUser} from '$core/handlers/database/user/user.func';
import {getUserDataFromDiscordUser} from '$core/handlers/database/user/user.util';
import {getGuildMember} from '$core/utils/discord/member';
import {getMemberDataFromDiscordMember} from '$core/handlers/database/member/member.util';
import {prisma} from '$core/handlers/database/prisma';

export const createGuildMember = async (userId: Snowflake, guildId: Snowflake, xp: number): Promise<Result<number, Error>> => {
	const discordUser = await getUser(userId);
	if (!discordUser.ok) {
		return error(discordUser.error);
	}

	const userResult = await getOrCreateUser(getUserDataFromDiscordUser(discordUser.value));
	if (!userResult.ok) {
		return error(userResult.error);
	}

	const guildMember = await getGuildMember(userId, guildId);
	if (!guildMember.ok) {
		return error(guildMember.error);
	}

	const data = getMemberDataFromDiscordMember(guildMember.value);
	data.xp = xp;

	const result = await resultify(() => prisma.guildMember.create({
		data: data,
		select: {
			xp: true
		}
	}));
	if (!result.ok) {
		return error(new DatabaseError(`failed to create guild Member with id ${userId} in guild ${guildId}`, result.error));
	}

	return ok(result.value.xp);
};