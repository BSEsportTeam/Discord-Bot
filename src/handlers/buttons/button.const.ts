import type {ButtonId} from './button.type';

export const BUTTONS_PATH = __dirname;

export const DYNAMIC_ID = 'd_';
export const DYNAMIC_ID_SEPARATOR = '.';

// id start with d_ are dynamic !
export const buttonsIds = {
	eventAnnouncements: {
		confirm: 'ea_1',
		cancel: 'ea_2'
	}
} satisfies Record<string, Record<string, ButtonId>>;