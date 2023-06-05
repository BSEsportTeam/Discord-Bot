import type {DebuggableError} from './error.type';
import type {DebugValues} from '$core/utils/logger/';

export class DatabaseError extends Error implements DebuggableError {
	
	debug(): DebugValues {
		return {};
	}
}