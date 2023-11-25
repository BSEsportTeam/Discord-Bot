import * as process from 'process';
import {forground256Color} from 'tintify';
import {LogLevel} from './logger.const';
import type {DebugValues} from './logger.type';
import {formatLog} from './logger.util';

export const logger = {
	fatal(message: string, debug?: DebugValues | string | string[]): never {
		console.log(formatLog(LogLevel.FATAL, message));
		if (typeof debug !== 'undefined') {
			logger.debug(debug);
		}
		process.exit(1);
	},

	error(message: string, debug?: DebugValues | string | string[]) {
		console.log(formatLog(LogLevel.ERROR, message));
		if (typeof debug !== 'undefined') {
			logger.debug(debug);
		}
	},

	warning(message: string) {
		console.log(formatLog(LogLevel.WARNING, message));
	},

	info(message: string) {
		console.log(formatLog(LogLevel.INFO, message));
	},

	debug(infos: DebugValues | string | string[]) {
		if (typeof infos === 'string') {
			logger._debug(infos);
		} else if (typeof infos === 'object') {
			if (Array.isArray(infos)) {
				for (const msg of infos) {
					logger._debug(msg);
				}
			} else {
				for (const key in infos) {
					logger._debug(`${forground256Color(68)}${key}: ${forground256Color(247)}${infos[key]}`);
				}
			}
		}
	},

	_debug(message: string) {
		console.log(formatLog(LogLevel.DEBUG, message));
	},

	debugValues(values: DebugValues) {
		for (const key in values) {
			logger.debug(`${forground256Color(68)}${key}: ${forground256Color(247)}${values[key]}`);
		}
	},
};