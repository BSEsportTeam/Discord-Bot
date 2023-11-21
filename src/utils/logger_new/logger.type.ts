import type {LogLevels} from '$core/utils/logger_new/logger.enum';

export type LogLevel = keyof typeof LogLevels;

export type LogLevelOption = {
	levelText: string;
	levelColor: string;
	textColor: string;
};

export type LogLevelOptions = Record<LogLevel, LogLevelOption>