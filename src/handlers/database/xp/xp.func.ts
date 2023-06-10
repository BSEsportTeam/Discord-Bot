import type {Result} from 'rustic-error';
import {error, ok, resultify} from 'rustic-error';
import {prisma} from '$core/handlers/database/prisma';
import type {Snowflake} from 'discord-api-types/globals';
import {DatabaseError} from '$core/utils/error';

export const getGlobalXp = async (userId: Snowflake): Promise<Result<number|null, DatabaseError>> => {
	const values = await resultify(() => prisma.guildMember.findMany({
		where: {
			userId: userId
		},
		select: {
			xp: true
		}
	}));

	if (!values.ok) return error(new DatabaseError('failed to get global xp for member with id ' + userId + '. Error : ' + values.error.message, values.error));
	if (values.value === null) return ok(null);
	return ok(values.value.reduce((pre, curr) => pre + curr.xp, 0));
};

export const getGuildXp = async (userId: Snowflake, guildId: Snowflake): Promise<Result<number|null, Error>> => {
	const result = await resultify(() => prisma.guildMember.findUnique({
		where: {
			guildId_userId: {
				userId: userId,
				guildId: guildId
			}
		},
		select: {
			xp: true
		}
	}));

	if (!result.ok) return error(new DatabaseError(`failed to get guild xp for member with id ${userId} and guild id ${guildId}. Error : ${result.error.message}`, result.error));
	return ok(result.value !== null ? result.value.xp : null);
};
/*
export const addXp = async (userId: Snowflake, guildId: Snowflake, xpAmound: number): Promise<Result<number, DatabaseError>> =>  {
	const result = await resultify(() => prisma.guildMember.update({
		where: {
			guildId_userId: {
				userId: userId,
				guildId: guildId
			}
		},
		data: {
			xp: {
				increment: xpAmound
			}
		},
		select: {
			xp: true
		}
	}));
	if (!result.ok) {
		return
	}
	return ok(result.value.xp);
}
 */