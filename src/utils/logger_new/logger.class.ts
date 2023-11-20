import type {LogLevel} from '$core/utils/logger_new/logger.type';
import {effectReset} from 'tintify';
import {DATE_COLOR, logLevelOptions, SEPARATOR_COLOR} from '$core/utils/logger';
import {DayJS} from '$core/utils/function/dayjs';

export class Logger {


	constructor(public readonly name: string) {
	}


	private formatLog(level: LogLevel, message: string): string {
		const reset = effectReset.all;
		const maxLevelTextSize = 8;
		const maxNameSize = 12;

		const options = logLevelOptions[level];

		const date = DayJS().format('YYYY-MM-DD HH:mm:ss');

		const prefix = `${DATE_COLOR}[${date}] (${this.name})${' '.repeat(maxNameSize - this.name.length)}${options.levelColor}${options.levelText}`;
		const separator = `${reset}${SEPARATOR_COLOR} ${'-'.repeat(maxLevelTextSize - options.levelText.length)} » `;
		const msg = `${reset}${options.textColor}${message}${reset}`;

		return prefix + separator + msg;
	}
}