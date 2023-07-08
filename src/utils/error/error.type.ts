import type {DebugValues} from '$core/utils/logger/';

export interface DebuggableError extends Error{
	debug(): DebugValues;
}