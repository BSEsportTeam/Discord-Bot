import type {Bump} from '@prisma/client';
import type {Result} from 'rustic-error';
import {error, ok} from 'rustic-error';
import {anyToError, DatabaseError} from '$core/utils/error';
import {prisma} from '$core/manager/database/prisma';
import {getToday} from '$core/handlers/database/bump/bump.util';
import type {MaybeOmit} from '$core/utils/type';

export const createBump = async (data: MaybeOmit<Bump, 'date'>): Promise<Result<Bump, DatabaseError>> => {
	try {
		const result = await prisma.bump.create({
			data: data,
		});

		return ok(result);
	} catch (e) {
		return error(new DatabaseError('Failed to create a new bump.', anyToError(e)));
	}
};

export const getBumpsInGuildToday = async (guildId: string): Promise<Result<Bump[], DatabaseError>> => {
	try {
		const result = await prisma.bump.findMany({
			where: {
				guildId: guildId,
				date: {
					gte: getToday(),
				},
			},
		});

		return ok(result);
	} catch (e) {
		return error(new DatabaseError(`Failed to get bumps sent today in the guild ${guildId}.`, anyToError(e)));
	}
};

export const getBumpsByUserToday = async (userId: string): Promise<Result<Bump[], DatabaseError>> => {
	try {
		const result = await prisma.bump.findMany({
			where: {
				userId: userId,
				date: {
					gte: getToday(),
				},
			},
		});

		return ok(result);
	} catch (e) {
		return error(new DatabaseError(`Failed to get bumps sent today by the user ${userId}.`, anyToError(e)));
	}
};

export const getBumpsByUserInGuildToday = async (userId: string, guildId: string): Promise<Result<Bump[], DatabaseError>> => {
	try {
		const result = await prisma.bump.findMany({
			where: {
				userId: userId,
				guildId: guildId,
				date: {
					gte: getToday(),
				},
			},
		});
		return ok(result);
	} catch (e) {
		return error(
			new DatabaseError(`Failed to get bumps sent today by the user ${userId} in the guild ${guildId}.`, anyToError(e))
		);
	}
};