import {prisma} from '$core/handlers/database/prisma';
import type {Result} from 'rustic-error';
import {error, ok} from 'rustic-error';
import type {User} from '@prisma/client';
import {Prisma} from '@prisma/client';
import {anyToError, DatabaseError} from '$core/utils/error';
import type {Snowflake} from 'discord-api-types/globals';

export const createUser = async (data: User): Promise<Result<User, DatabaseError>> => {
	try {
		const user = await prisma.user.create({
			data: data,
		});

		return ok(user);
	} catch (e) {
		return error(new DatabaseError('Failed to create new user with id ' + data.id, anyToError(e)));
	}
};

export const getUser = async (id: Snowflake): Promise<Result<User | null, DatabaseError>> => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: id,
			},
		});

		return ok(user);
	} catch (e) {
		return error(new DatabaseError('Failed to get user with id ' + id, anyToError(e)));
	}
};

export const getOrCreateUser = async (data: User): Promise<Result<User, DatabaseError>> => {
	try {
		// noinspection TypeScriptValidateJSTypes
		const user = await prisma.user.upsert({
			where: {
				id: data.id,
			},
			update: {
			},
			create: data
		});

		return ok(user);
	} catch (e) {
		return error(new DatabaseError('Failed to get or create user with id ' + data.id, anyToError(e)));
	}
};

export const updateUsername = async (id: Snowflake, username: string): Promise<Result<User | null, DatabaseError>> => {
	try {
		const result = await prisma.user.update({
			where: {
				id,
			},
			data: {
				username,
			},
		});

		return ok(result);
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code === 'P2001' || e.code === 'P2025') {
				return ok(null);
			}
		}

		return error(new DatabaseError(`Failed to update username for user ${id}`, anyToError(e)));
	}
};

export const updateAvatar = async (id: Snowflake, avatar?: string): Promise<Result<User | null, DatabaseError>> => {
	try {
		const result = await prisma.user.update({
			where: {
				id,
			},
			data: {
				avatar,
			},
		});

		return ok(result);
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code === 'P2001' || e.code === 'P2025') {
				return ok(null);
			}
		}

		return error(new DatabaseError('Failed to update avatar for user', anyToError(e)));
	}
};

export const updateDisplayName = async (id: Snowflake, displayName: string): Promise<Result<User | null, DatabaseError>> => {
	try {
		const result = await prisma.user.update({
			where: {
				id,
			},
			data: {
				displayName,
			},
		});

		return ok(result);
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code === 'P2001' || e.code === 'P2025') {
				return ok(null);
			}
		}

		return error(new DatabaseError(`Failed to update display name for user ${id}`, anyToError(e)));
	}
};

