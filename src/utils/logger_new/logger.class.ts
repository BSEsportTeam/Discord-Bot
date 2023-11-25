import type {DebugValues, ErrorParams, LogLevel} from '$core/utils/logger_new/logger.type';
import {effectReset} from 'tintify';
import {DATE_COLOR, logLevelOptions, SEPARATOR_COLOR} from '$core/utils/logger';
import {DayJS} from '$core/utils/function/dayjs';
import {
  debugCategoryColor,
  debugCategorySpaces,
  debugValueColor,
  debugValueSpaces
} from '$core/utils/logger_new/logger.const';
import * as process from 'process';
import {stringifyNumber} from '$core/utils/function/number';

export class Logger {


  constructor(public readonly name: string) {
  }

  public fatal(infos: ErrorParams): never {
    this.formatLog('fatal', infos.m);
    if (infos.e) {
      this.logErrorHistory(infos.e);
      if (infos.e.stack) {
        this.logStack(infos.e.stack);
      }
    }

    if (infos.d) {
      this.logDebugValues(infos.d);
    }

    process.exit(1);
  }

  public error(infos: ErrorParams): void {
    console.log(this.formatLog('error', infos.m));
    if (infos.e) {
      this.logErrorHistory(infos.e);
      if (infos.e.stack) {
        this.logStack(infos.e.stack);
      }
    }

    if (infos.d) {
      this.logDebugValues(infos.d);
    }
  }

  public warning(message: string): void {
    console.log(this.formatLog('warning', message));
  }

  public info(message: string): void {
    console.log(this.formatLog('info', message));
  }

  public debug(message: string): void {
    console.log(this.formatLog('debug', message));
  }

  public debugValues(debugValues: DebugValues): void {
    this.formatLog('debug', 'Debug values :');
    this.logDebugValues(debugValues, false);
  }


  private logErrorHistory(error: Error): void {
    if (!error.cause || !(error.cause instanceof Error)) {
      console.log(debugCategoryColor + `${' '.repeat(debugCategorySpaces)} Initial error message :` + effectReset.all);
      console.log(debugValueColor + `${' '.repeat(debugValueSpaces)} ${error.message}` + effectReset.all);
      return;
    }
    console.log(debugCategoryColor + `${' '.repeat(debugCategorySpaces)} Error history :` + effectReset.all);
    console.log(debugValueColor + `${' '.repeat(debugValueSpaces)} 1. ${error.message}` + effectReset.all);

    let i = 1;
    let cause: Error | null = error.cause;
    while (cause) {
      i++;
      console.log(debugValueColor + `${' '.repeat(debugValueSpaces)} ${i}. ${cause.message}` + effectReset.all);
      if (cause.cause && cause.cause instanceof Error) {
        cause = cause.cause;
      } else {
        cause = null;
      }
    }
  }

  private logDebugValues(debugValues: DebugValues, sendCategory = true): void {
    if (!debugValues || Object.keys(debugValues).length === 0) {
      return;
    }

    if (sendCategory) {
      console.log(debugCategoryColor + `${' '.repeat(debugCategorySpaces)} Debug values :` + effectReset.all);

    }
    for (const [key, value] of Object.entries(debugValues)) {
      console.log(debugValueColor + `${' '.repeat(debugValueSpaces)} ↳ ${key} : ${this.stringifyDebugValue(value)}` + effectReset.all);
    }
  }

  private stringifyDebugValue(value: unknown): string {
    if (typeof value === 'string') {
      return value;
    }

    if (typeof value === 'number') {
      return stringifyNumber(value);
    }

    if (typeof value === 'boolean') {
      return value ? 'true' : 'false';
    }

    if (typeof value === 'bigint') {
      return value.toString();
    }

    if (typeof value === 'symbol') {
      return value.toString();
    }

    if (typeof value === 'undefined') {
      return 'undefined';
    }

    if (typeof value === 'object') {
      return JSON.stringify(value);
    }

    return 'unknown';

  }

  private logStack(stack: string): void {
    console.log(debugCategoryColor + `${' '.repeat(debugCategorySpaces)} Stack trace :` + effectReset.all);
    const lines = stack.split('\n');
    for (const line of lines) {
      console.log(debugValueColor + `${' '.repeat(debugValueSpaces)} ↳ ${line}` + effectReset.all);
    }
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