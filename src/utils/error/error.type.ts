import type {DebugValues} from '$core/utils/logger/';

export type DebuggableError = {
	debug: () => DebugValues;
} & Error