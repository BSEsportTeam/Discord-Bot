import type {LogLevelOptions} from "$core/utils/logger/logger.type";
import {brightBackground, brightForground, forground, forground256Color} from "tintify";

export enum LogLevel {
  FATAL = "fatal",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
  DEBUG = "debug"
}

export const logLevelOptions: { [key in LogLevel]: LogLevelOptions } = {
  fatal: {
    levelText: "FATAL",
    levelColor: forground256Color(255) + brightBackground.red,
    textColor: forground.red,
  },

  error: {
    levelText: "ERROR",
    levelColor: brightForground.red,
    textColor: forground256Color(255),
  },

  warning: {
    levelText: "WARNING",
    levelColor: forground256Color(209),
    textColor: forground256Color(255),
  },

  info: {
    levelText: "INFO",
    levelColor: brightForground.green,
    textColor: forground256Color(252),
  },

  debug: {
    levelText: "DEBUG",
    levelColor: forground256Color(245),
    textColor: forground256Color(247),
  },
};

export const DATE_COLOR = forground.white;
export const SEPARATOR_COLOR = forground256Color(240);