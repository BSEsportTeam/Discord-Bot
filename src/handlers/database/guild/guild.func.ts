import type {Result} from 'rustic-error';
import {error, ok} from 'rustic-error';
import {anyToError, DatabaseError} from '$core/utils/error';
import {prisma} from '$core/manager/database/prisma';
import type {Guild} from '@prisma/client';

export const getAllGuilds = async (): Promise<Result<Guild[], DatabaseError>> => {
	try {
		const guilds = await prisma.guild.findMany();
		return ok(guilds);
	} catch (e) {
		return error(new DatabaseError('Failed to retrieve all guilds', anyToError(e)));
	}
};

export const setLastMessagePub = async (guildId: string, date: Date): Promise<Result<null, DatabaseError>> => {
	try {
		await prisma.guild.update({
			where: {
				id: guildId,
			},
			data: {
				lastPubMessage: date
			},
		});

		return ok(null);
	} catch (e) {
		return error(new DatabaseError('Failed to set last message pub date', anyToError(e)));
	}
};

export const addMessagesSinceLastPub = async (guildId: string, count: number): Promise<Result<null, DatabaseError>> => {
	try {
		await prisma.guild.update({
			where: {
				id: guildId,
			},
			data: {
				messagesSinceLastPub: {
					increment: count,
				},
			},
		});

		return ok(null);
	} catch (e) {
		return error(new DatabaseError('Failed to add messages since last pub', anyToError(e)));
	}
};

export const resetMessagesSinceLastPub = async (guildId: string): Promise<Result<null, DatabaseError>> => {
	try {
		await prisma.guild.update({
			where: {
				id: guildId,
			},
			data: {
				messagesSinceLastPub: 0,
			},
		});

		return ok(null);
	} catch (e) {
		return error(new DatabaseError('Failed to reset messages since last pub', anyToError(e)));
	}
};