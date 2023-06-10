import type {DebugValues} from '$core/utils/logger/';

export interface DebuggableError extends Error{
	debug(): DebugValues;
}

export interface InteractionDebugsBase extends DebugValues {
	user: string;
	channel: string
	guild: string
}

export interface CommandDebugsBase extends InteractionDebugsBase {
	'command options': string;
}

export type CommandDebugs = CommandDebugsBase|Omit<CommandDebugsBase, 'channel'|'guild'>

export interface ButtonDebugsBase extends InteractionDebugsBase {
	customId: string;
}

export type ButtonDebugs = ButtonDebugsBase|Omit<ButtonDebugsBase, 'channel'|'guild'>;