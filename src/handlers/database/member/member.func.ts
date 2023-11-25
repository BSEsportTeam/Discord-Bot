import type {Guild, GuildMember, User} from '@prisma/client';
import {Prisma} from '@prisma/client';
import type {Result} from 'rustic-error';
import {error, ok} from 'rustic-error';
import {anyToError, DatabaseError} from '$core/utils/error';
import {prisma} from '$core/manager/database/prisma';
import type {Snowflake} from 'discord-api-types/globals';

export const createGuildMember = async (data: GuildMember): Promise<Result<GuildMember, DatabaseError>> => {
	try {
		const member = await prisma.guildMember.create({
			data: data,
		});

		return ok(member);
	} catch (e) {
		return error(new DatabaseError(`Failed to create new guildMember with id ${data.userId} in guild ${data.guildId}`, anyToError(e)));
	}
};

export const getGuildMember = async (userId: Snowflake, guildId: Snowflake): Promise<Result<GuildMember | null, DatabaseError>> => {
	try {
		const member = await prisma.guildMember.findUnique({
			where: {
				guildId_userId: {
					userId,
					guildId,
				},
			},
		});

		return ok(member);
	} catch (e) {
		return error(new DatabaseError(`Failed to get guildMember with id ${userId} in guild ${guildId}`, anyToError(e)));
	}
};

export const getDetailedGuildMember = async (userId: Snowflake, guildId: Snowflake): Promise<Result<GuildMember & {
	guild: Guild;
	user: User
} | null, DatabaseError>> => {
	try {
		const member = await prisma.guildMember.findUnique({
			where: {
				guildId_userId: {
					userId,
					guildId,
				},
			},
			include: {
				user: true,
				guild: true,
			},
		});

		return ok(member);
	} catch (e) {
		return error(new DatabaseError(`Failed to get guildMember with id ${userId} in guild ${guildId}`, anyToError(e)));
	}
};

export const updateGuildUsername = async (userId: Snowflake, guildId: Snowflake, username?: string): Promise<Result<GuildMember | null, DatabaseError>> => {
	try {
		const member = await prisma.guildMember.update({
			where: {
				guildId_userId: {
					userId,
					guildId,
				},
			},
			data: {
				displayName: username,
			},
		});

		return ok(member);
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code === 'P2001' || e.code === 'P2025') {
				return ok(null);
			}
		}

		return error(new DatabaseError(`Failed to update guild username for member ${userId} in guild ${guildId}`, anyToError(e)));
	}
};

export const updateGuildAvatar = async (userId: Snowflake, guildId: Snowflake, avatar?: string): Promise<Result<GuildMember | null, DatabaseError>> => {
	try {
		const member = await prisma.guildMember.update({
			where: {
				guildId_userId: {
					userId,
					guildId,
				},
			},
			data: {
				avatar,
			},
		});

		return ok(member);
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code === 'P2001' || e.code === 'P2025') {
				return ok(null);
			}
		}

		return error(new DatabaseError(`Failed to update guild avatar for member ${userId} in guild ${guildId}`, anyToError(e)));
	}
};