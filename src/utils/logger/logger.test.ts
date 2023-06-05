import {describe, expect, it} from 'vitest';
import {formatLog} from './logger.util';
import {DayJS} from '$core/utils/dayjs';
import type {LogLevel} from '$core/utils/logger/logger.const';
import {DATE_COLOR, logLevelOptions, SEPARATOR_COLOR} from '$core/utils/logger/logger.const';
import {effectReset} from 'tintify';

describe('formatLog', () => {
	const currentDate = DayJS().format('YYYY-MM-DD HH:mm:ss');
	const reset = effectReset.all;

	it('formats log message correctly for "fatal" log level', () => {
		const options = logLevelOptions.fatal;
		const level = 'fatal';
		const message = 'Fatal message';

		const expectedLog = `${DATE_COLOR}[${currentDate}] ${options.levelColor}FATAL${reset}${SEPARATOR_COLOR} --- » ${reset}${options.textColor}Fatal message${reset}`;

		const formattedLog = formatLog(level as LogLevel, message);
		expect(formattedLog).toBe(expectedLog);
	});

	it('formats log message correctly for "error" log level', () => {
		const options = logLevelOptions.error;
		const level = 'error';
		const message = 'Error message';

		const expectedLog = `${DATE_COLOR}[${currentDate}] ${options.levelColor}ERROR${reset}${SEPARATOR_COLOR} --- » ${reset}${options.textColor}Error message${reset}`;

		const formattedLog = formatLog(level as LogLevel, message);
		expect(formattedLog).toBe(expectedLog);
	});

	it('formats log message correctly for "warning" log level', () => {
		const options = logLevelOptions.warning;
		const level = 'warning';
		const message = 'Warning message';

		const expectedLog = `${DATE_COLOR}[${currentDate}] ${options.levelColor}WARNING${reset}${SEPARATOR_COLOR} - » ${reset}${options.textColor}Warning message${reset}`;

		const formattedLog = formatLog(level as LogLevel, message);
		expect(formattedLog).toBe(expectedLog);
	});

	it('formats log message correctly for "info" log level', () => {
		const options = logLevelOptions.info;
		const level = 'info';
		const message = 'Info message';

		const expectedLog = `${DATE_COLOR}[${currentDate}] ${options.levelColor}INFO${reset}${SEPARATOR_COLOR} ---- » ${reset}${options.textColor}Info message${reset}`;

		const formattedLog = formatLog(level as LogLevel, message);
		expect(formattedLog).toBe(expectedLog);
	});

	it('formats log message correctly for "debug" log level', () => {
		const options = logLevelOptions.debug;
		const level = 'debug';
		const message = 'Debug message';

		const expectedLog = `${DATE_COLOR}[${currentDate}] ${options.levelColor}DEBUG${reset}${SEPARATOR_COLOR} --- » ${reset}${options.textColor}Debug message${reset}`;

		const formattedLog = formatLog(level as LogLevel, message);
		expect(formattedLog).toBe(expectedLog);
	});
});