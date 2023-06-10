import type {ButtonInteraction} from 'discord.js';
import type {DebuggableError} from './error.type';
import type {DebugValues} from '$core/utils/logger/';
import {isDebuggableError} from '$core/utils/error/error.util';

export class ButtonError extends Error implements DebuggableError {
	constructor(
		message: string,
		public interaction: ButtonInteraction,
		public sourceError?: Error
	) {
		super(message);
	}
	debug(): DebugValues {
		const debug = {};
		if (this.sourceError !== undefined && isDebuggableError(this.sourceError)) return {...debug, ...this.sourceError.debug()};
		return debug;
	}
}