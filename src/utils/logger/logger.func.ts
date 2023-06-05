import * as process from 'process';
import {forground256Color} from 'tintify';
import {LogLevel} from './logger.const';
import type {DebugValues} from './logger.type';
import {formatLog} from './logger.util';

export const logger = {
	fatal(message: string, debug: string[]|null = null): never {
		console.log(formatLog(LogLevel.FATAL, message));
		if (debug !== null) {
			for (const msg of debug) {
				logger.debug(msg);
			}
		}
		process.exit(1);
	},

	error(message: string) {
		console.log(formatLog(LogLevel.ERROR, message));
	},

	warning(message: string) {
		console.log(formatLog(LogLevel.WARNING, message));
	},

	info(message: string) {
		console.log(formatLog(LogLevel.INFO, message));
	},

	debug(message: string) {
		console.log(formatLog(LogLevel.DEBUG, message));
	},

	debugValues(values: DebugValues) {
		for (const key in values) {
			logger.debug(`${forground256Color(68)}${key}: ${forground256Color(247)}${values[key]}`);
		}
	}
};
