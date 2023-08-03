import type {Result} from 'rustic-error';
import {error, ok} from 'rustic-error';
import {prisma} from '$core/handlers/database/prisma';
import {anyToError, DatabaseError} from '$core/utils/error';
import type {Guild, XpMovement} from '@prisma/client';
import type {MaybeOmit} from '$core/utils/type';

export const createXpMovement = async (data: MaybeOmit<XpMovement, 'date' | 'id'>): Promise<Result<XpMovement & {
	guild: Guild
}, DatabaseError>> => {
	try {
		const result = await prisma.xpMovement.create({
			data: data,
			include: {
				guild: true
			}
		});

		return ok(result);
	} catch (e) {
		return error(new DatabaseError('Failed to create a new XpMovement.', anyToError(e)));
	}
};

export const getXpMovement = async (id: number): Promise<Result<XpMovement & {
	guild: Guild
} | null, DatabaseError>> => {
	try {
		const result = await prisma.xpMovement.findUnique({
			where: {
				id
			},
			include: {
				guild: true
			}
		});
		return ok(result);
	} catch (e) {
		return error(new DatabaseError('Failed to get a XpMovement.', anyToError(e)));
	}
};