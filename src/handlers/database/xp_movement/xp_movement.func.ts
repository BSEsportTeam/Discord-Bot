import type {Result} from 'rustic-error';
import {error, ok} from 'rustic-error';
import {prisma} from '$core/handlers/database/prisma';
import {anyToError, DatabaseError} from '$core/utils/error';
import type {XpMovement} from '@prisma/client';
import type {MaybeOmit} from '$core/utils/type';

export const createXpMovement = async (data: MaybeOmit<XpMovement, 'date'|'id'>): Promise<Result<XpMovement, DatabaseError>> => {
	try {
		const result = await prisma.xpMovement.create({
			data: data,
		});

		return ok(result);
	} catch (e) {
		return error(new DatabaseError('Failed to create a new XpMovement.', anyToError(e)));
	}
};
