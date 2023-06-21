import type {ButtonId, ButtonIdFunction} from './button.type';

export const BUTTONS_PATH = __dirname;

export const DYNAMIC_ID = 'd_';
export const DYNAMIC_ID_SEPARATOR = '.';

// id start with d_ are dynamic !
export const buttonsIds = {
	eventAnnouncements: {
		confirm: 'ea_1',
		cancel: 'ea_2'
	},
	dropXp: {
		base: DYNAMIC_ID + 'dxp'
	}
} satisfies Record<string, Record<string, ButtonId>>;

export const buttonsDynamicIds = {
	dropXp: {
		construct:  (author: string, amount: string) => `${buttonsIds.dropXp.base}${DYNAMIC_ID_SEPARATOR}${author}${DYNAMIC_ID_SEPARATOR}${amount}`,
		deconstruct: (id: string) => id.split(DYNAMIC_ID_SEPARATOR).slice(-2)
	}
} satisfies Record<string, Record<'construct'|'deconstruct', ButtonIdFunction>>;