import type {Result} from 'rustic-error';
import {error, ok} from 'rustic-error';
import {prisma} from '$core/handlers/database/prisma';
import type {Snowflake} from 'discord-api-types/globals';
import {anyToError, DatabaseError} from '$core/utils/error';
import {Prisma} from '@prisma/client';
import {createGuildMember} from '$core/handlers/database/xp/xp.util';
import type {GlobalXPTop, GuildXPTop} from '$core/handlers/database/xp/xp.type';

export const getGlobalXp = async (userId: Snowflake): Promise<Result<number | null, DatabaseError>> => {
	try {
		const values = await prisma.guildMember.findMany({
			where: {
				userId: userId,
			},
			select: {
				xp: true,
			},
		});

		if (values === null) {
			return ok(null);
		}

		return ok(values.reduce((pre, curr) => pre + curr.xp, 0));
	} catch (e) {
		return error(new DatabaseError(`Failed to get global xp for member with id ${userId}`, anyToError(e)));
	}
};

export const getGuildXp = async (userId: Snowflake, guildId: Snowflake): Promise<Result<number | null, DatabaseError>> => {
	try {
		const result = await prisma.guildMember.findUnique({
			where: {
				guildId_userId: {
					userId: userId,
					guildId: guildId,
				},
			},
			select: {
				xp: true,
			},
		});

		return ok(result !== null ? result.xp : null);
	} catch (e) {
		return error(new DatabaseError(`Failed to get guild xp for member with id ${userId} and guild id ${guildId}`, anyToError(e)));
	}
};

export const getGlobalTop = async (startIndex = 0, take = 10): Promise<Result<GlobalXPTop[], DatabaseError>> => {
	try {
		const result = await prisma.guildMember.groupBy({
			by: ['userId'],
			orderBy: [{
				_sum: {
					xp: 'desc',
				},
			}],
			_sum: {
				xp: true,
			},
			skip: startIndex,
			take: take,
		});

		const tops: GlobalXPTop[] = [];

		for (let i = 0; i < result.length; i++) {
			tops.push({
				position: i + 1 + startIndex,
				xp: result[i]._sum.xp || 0,
				id: result[i].userId,
			});
		}

		return ok(tops);
	} catch (e) {
		return error(new DatabaseError('Failed to get global top', anyToError(e)));
	}
};

export const getGuildTop = async (guildId: Snowflake, startIndex = 0, take = 10): Promise<Result<GlobalXPTop[], DatabaseError>> => {
	try {
		const result = await prisma.guildMember.findMany({
			where: {
				guildId: guildId,
			},
			orderBy: {
				xp: 'desc',
			},
			skip: startIndex,
			take: take,
			include: {
				user: true,
			},
		});

		const tops: GuildXPTop[] = [];

		for (let i = 0; i < result.length; i++) {
			tops.push({
				position: i + 1 + startIndex,
				xp: result[i].xp,
				id: result[i].userId,
				displayName: result[i].displayName || result[i].user.displayName,
			});
		}

		return ok(tops);
	} catch (e) {
		return error(new DatabaseError(`Failed to get top for server ${guildId}`, anyToError(e)));
	}
};

export const getGlobalPosition = async (userId: Snowflake): Promise<Result<number, DatabaseError>> => {
	try {
		const xp = await getGlobalXp(userId);

		if (!xp.ok) {
			return error(xp.error);
		}

		const position = await prisma.guildMember.count({
			where: {
				xp: {
					gt: xp.value || 0,
				},
			},
		});

		return ok(position);

	} catch (e) {
		return error(new DatabaseError(`Failed to get position for player ${userId} globally`, anyToError(e)));
	}
};

export const getGuildPosition = async (userId: Snowflake, guildId: Snowflake): Promise<Result<number, DatabaseError>> => {
	try {
		const xp = await getGuildXp(userId, guildId);

		if (!xp.ok) {
			return error(xp.error);
		}

		const position = await prisma.guildMember.count({
			where: {
				guildId: guildId,
				xp: {
					gt: xp.value  || 0
				}
			},
		});

		return ok(position);

	} catch (e) {
		return error(new DatabaseError(`Failed to get position for player ${userId} in guild ${guildId}`, anyToError(e)));
	}
};


export const addXpToMember = async (userId: Snowflake, guildId: Snowflake, xpAmount: number): Promise<Result<number, DatabaseError | Error>> => {
	try {
		const result = await prisma.guildMember.update({
			where: {
				guildId_userId: {
					userId: userId,
					guildId: guildId,
				},
			},
			data: {
				xp: {
					increment: xpAmount,
				},
			},
			select: {
				xp: true,
			},
		});

		return ok(result.xp);
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code === 'P2001') {
				return createGuildMember(userId, guildId, xpAmount);
			}
		}

		return error(new DatabaseError(`Failed to add xp to user ${userId} for guild ${guildId}`, anyToError(e)));
	}
};
