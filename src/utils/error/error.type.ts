import type {DebugValues} from '$core/utils/logger/';

export interface DebuggableError extends Error{
	debug(): DebugValues;
}

export interface CommandDebugsBase extends DebugValues {
	'command options': string;
	user: string;
	channel: string
	guild: string
}

export type CommandDebugs = CommandDebugsBase|Omit<CommandDebugsBase, 'channel'|'guild'>