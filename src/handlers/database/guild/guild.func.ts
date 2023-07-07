import type {Result} from 'rustic-error';
import {error, ok} from 'rustic-error';
import {anyToError, DatabaseError} from '$core/utils/error';
import {prisma} from '$core/handlers/database/prisma';

export const getLastMessagePubId = async (): Promise<Result<string | null, DatabaseError>> => {
	try {
		const guild = await prisma.guild.findFirst({
			select: {
				lastPubMessageId: true,
			},
		});

		return ok(guild?.lastPubMessageId || null);
	} catch (e) {
		return error(new DatabaseError('Failed to get last message pub ID', anyToError(e)));
	}
};

export const getMessagesSinceLastPub = async (): Promise<Result<number, DatabaseError>> => {
	try {
		const guild = await prisma.guild.findFirst({
			select: {
				messagesSinceLastPub: true,
			},
		});

		return ok(guild?.messagesSinceLastPub || 0);
	} catch (e) {
		return error(new DatabaseError('Failed to get messages since last pub', anyToError(e)));
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