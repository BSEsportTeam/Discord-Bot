import type { LogLevels } from "$core/utils/logger_new/logger.enum";

export type LogLevel = keyof typeof LogLevels;

export type DebugValues = { [key: string]: unknown };

export type LogLevelOption = {
  levelText: string;
  levelColor: string;
  textColor: string;
};

export type LogLevelOptions = Record<LogLevel, LogLevelOption>

export type ErrorParams = {
  /*
   * The error message.

   */
  m: string;
  /*
   * The error stack.

   */
  e?: Error;
  /*
   * The error debug values.

   */
  d?: DebugValues;
}