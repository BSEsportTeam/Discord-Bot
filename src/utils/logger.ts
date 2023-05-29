import * as process from 'process';
import {brightBackground, brightForground, effectReset, forground, forground256Color} from 'tintify';
import {DayJS} from '$core/utils/dayjs';

export type DebugValues = { [key: string]: string };
enum LogLevel {
	fatal,
	error,
	warning,
	info,
	debug
}
export const logger = {
	fatal(message: string, debug: string[]|null = null): never {
		console.log(formatLog(LogLevel.fatal, message));
		if (debug !== null) {
			for (const msg of debug) {
				logger.debug(msg);
			}
		}
		process.exit(1);
	},
	error(message: string) {
		console.log(formatLog(LogLevel.error, message));
	},
	warning(message: string) {
		console.log(formatLog(LogLevel.warning, message));
	},
	info(message: string) {
		console.log(formatLog(LogLevel.info, message));
	},
	debug(message: string) {
		console.log(formatLog(LogLevel.debug, message));
	},
	debugValues(values: DebugValues) {
		for (const key in values) {
			logger.debug(`${forground256Color(68)}${key}: ${forground256Color(247)}${values[key]}`);
		}
	}

};

type LogLevelOptions = {
	level: string;
	levelColor: string;
	textColor: string
}

const getLogLevelOptions = (level: LogLevel): LogLevelOptions => {
	const options: LogLevelOptions = {
		level: 'UNKNOWN',
		levelColor: brightForground.black,
		textColor: forground256Color(255)
	};
	switch (level) {
	case LogLevel.fatal:
		options.level = 'FATAL';
		options.levelColor = forground256Color(255) + brightBackground.red;
		options.textColor = forground.red;
		break;
	case LogLevel.error:
		options.level = 'ERROR';
		options.levelColor = brightForground.red;
		break;
	case LogLevel.warning:
		options.level = 'WARNING';
		options.levelColor = forground256Color(209);
		break;
	case LogLevel.info:
		options.level = 'INFO';
		options.levelColor = brightForground.green;
		options.textColor = forground256Color(252);
		break;
	case LogLevel.debug:
		options.level = 'DEBUG';
		options.levelColor = forground256Color(245);
		options.textColor = forground256Color(247);
		break;
	default:

	}
	return options;
};

const formatLog = (level: LogLevel, message: string): string =>  {
	const maxLevelTextSize = 8;
	const options = getLogLevelOptions(level);
	const date = DayJS().format('YYYY-MM-DD HH:mm:ss');
	const prefix = `${forground.white}[${date}] ${options.levelColor}${options.level}`;
	const separator = `${effectReset.all}${forground256Color(240)} ${'-'.repeat(maxLevelTextSize - options.level.length)} » `;
	const msg = `${effectReset.all}${options.textColor}${message}${effectReset.all}`;
	return prefix+separator+msg;
};