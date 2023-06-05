import type {LogLevel} from './logger.const';
import {DATE_COLOR, logLevelOptions, SEPARATOR_COLOR} from './logger.const';
import {DayJS} from '$core/utils/dayjs';
import {effectReset} from 'tintify';

export const formatLog = (level: LogLevel, message: string): string =>  {
	const reset = effectReset.all;
	const maxLevelTextSize = 8;
	const options = logLevelOptions[level];
	const date = DayJS().format('YYYY-MM-DD HH:mm:ss');
	const prefix = `${DATE_COLOR}[${date}] ${options.levelColor}${options.levelText}`;
	const separator = `${reset}${SEPARATOR_COLOR} ${'-'.repeat(maxLevelTextSize - options.levelText.length)} » `;
	const msg = `${reset}${options.textColor}${message}${reset}`;
	return prefix+separator+msg;
};

