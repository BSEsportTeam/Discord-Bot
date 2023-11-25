import type {DebuggableError} from './error.type';
import type {DebugValues} from '$core/utils/logger/';
import {Prisma} from '@prisma/client';

export class DatabaseError extends Error implements DebuggableError {


	constructor(message: string, public origin: Error) {
		super(message);
	}

	debug(): DebugValues {
		const debugs: DebugValues = {};

		debugs['db origin message'] = this.origin.message;

		if (this.origin instanceof Prisma.PrismaClientKnownRequestError) {
			debugs['database error code'] = this.origin.code;
		}
		return debugs;
	}

}