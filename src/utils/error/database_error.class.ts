import type {DebuggableError} from './error.type';
import type {DebugValues} from '$core/utils/logger/';
import {Prisma} from '@prisma/client';

export class DatabaseError extends Error implements DebuggableError {


	constructor(message: string, public  origin: Error) {
		super(message);
	}
	
	debug(): DebugValues {
		if (this.origin instanceof Prisma.PrismaClientKnownRequestError) {
			return {
				PrismaErrorCode: this.origin.code
			};
		}
		return {};
	}
}