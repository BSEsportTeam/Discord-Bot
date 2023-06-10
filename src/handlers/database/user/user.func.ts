import {prisma} from '$core/handlers/database/prisma';
import type { Result} from 'rustic-error';
import {error, ok, resultify} from 'rustic-error';
import type {User} from '@prisma/client';
import {DatabaseError} from '$core/utils/error';
import type {Snowflake} from 'discord-api-types/globals';
import {Prisma} from '@prisma/client';

export const createUser = async (data: User): Promise<Result<User, DatabaseError>> => {
	const result = await resultify(() => prisma.user.create({
		data: data
	}));
	if (result.ok) {
		return ok(result.value);
	}

	return error(new DatabaseError('failed to create new user with id ' + data.id, result.error));
};

export const getUser = async (id: Snowflake): Promise<Result<User|null, DatabaseError>> => {
	const result = await resultify(() => prisma.user.findUnique({
		where: {
			id: id
		}
	}));
	if (result.ok) {
		return ok(result.value);
	}

	return error(new DatabaseError('failed to get user with id ' + id, result.error));
};

export const updateUsername = async (id: Snowflake, username: string): Promise<Result<User|null, DatabaseError>> => {
	const result = await resultify(() => prisma.user.update({
		where: {
			id
		},
		data: {
			username
		}
	}));

	if (result.ok) {
		return ok(result.value);
	}

	if (result.error instanceof Prisma.PrismaClientKnownRequestError) {
		if (result.error.code === 'P2001') {
			return ok(null);
		}
	}

	return error(new DatabaseError('failed to get user', result.error));
};

export const updateAvatar = async (id: Snowflake, avatar: string): Promise<Result<User|null, DatabaseError>> => {
	const result = await resultify(() => prisma.user.update({
		where: {
			id
		},
		data: {
			avatar
		}
	}));

	if (result.ok) {
		return ok(result.value);
	}

	if (result.error instanceof Prisma.PrismaClientKnownRequestError) {
		if (result.error.code === 'P2001') {
			return ok(null);
		}
	}

	return error(new DatabaseError('failed to get user', result.error));
};
