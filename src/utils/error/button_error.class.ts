import type {ButtonInteraction} from 'discord.js';
import type {DebuggableError} from './error.type';
import type {DebugValues} from '$core/utils/logger/';

export class ButtonError extends Error implements DebuggableError {
	constructor(
		message: string,
		public interaction: ButtonInteraction,
		public sourceError?: Error
	) {
		super(message);
	}
	debug(): DebugValues {
		return {};
	}
}