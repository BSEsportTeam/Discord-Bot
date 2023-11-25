import type {LogLevelOptions} from '$core/utils/logger_new/logger.type';
import {brightBackground, brightForground, forground, forground256Color} from 'tintify';

export const logLevelOptions: LogLevelOptions = {
	fatal: {
		levelText: 'FATAL',
		levelColor: forground256Color(255) + brightBackground.red,
		textColor: forground.red,
	},

	error: {
		levelText: 'ERROR',
		levelColor: brightForground.red,
		textColor: forground256Color(255),
	},

	warning: {
		levelText: 'WARNING',
		levelColor: forground256Color(209),
		textColor: forground256Color(255),
	},

	info: {
		levelText: 'INFO',
		levelColor: brightForground.green,
		textColor: forground256Color(252),
	},

	debug: {
		levelText: 'DEBUG',
		levelColor: forground256Color(245),
		textColor: forground256Color(247),
	},
};

export const debugCategorySpaces = 70;
export const debugValueSpaces = 90;

export const debugCategoryColor = forground256Color(244);
export const debugValueColor = forground256Color(248);