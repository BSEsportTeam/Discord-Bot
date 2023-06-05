import type {Result} from 'rustic-error';
import {error, ok, resultify} from 'rustic-error';
import {prisma} from '$core/handlers/database/prisma';
import type {Snowflake} from 'discord-api-types/globals';

export const getGlobalXP = async (userId: Snowflake): Promise<Result<number, Error>> => {
	const values = await resultify(() => prisma.guildMember.findMany({
		where: {
			userId: userId
		},
		select: {
			xp: true
		}
	}));
	if (!values.ok) return error(new Error('failed to get global xp for member with id ' + userId + ' error: ' + values.error.message));
	if (values.value === null) return ok(0);
	return ok(values.value.reduce((pre, curr) => pre + curr.xp, 0));
};