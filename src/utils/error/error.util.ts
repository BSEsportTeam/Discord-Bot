import type {DebuggableError} from './error.type';

export const isDebuggableError = (error: Error): error is DebuggableError => {
	return 'debug' in error;
};