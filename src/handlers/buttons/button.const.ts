import type { ButtonId, ButtonIdFunctionConstruct, ButtonIdFunctionDeconstruct } from "./button.type";

export const BUTTONS_PATH = __dirname;

export const DYNAMIC_ID = "d_";
export const DYNAMIC_ID_SEPARATOR = ".";

export const CONFIRM_BUTTON_DIR = "confirm";

// id start with d_ are dynamic !
export const buttonsIds = {
  eventAnnouncements: {
    confirm: "ea_1",
    cancel: "ea_2",
  },
  dropXp: {
    base: DYNAMIC_ID + "dxp",
  },
  topLevel: {
    pages: DYNAMIC_ID + "tlvlp",
    detailed: DYNAMIC_ID + "tlvld",
  },
  confirm: {
    confirm: DYNAMIC_ID + "cf",
    cancel: DYNAMIC_ID + "cl",
  },
} satisfies Record<string, Record<string, ButtonId>>;

export const buttonsDynamicIds = {
  dropXp: {
    construct: (author: string, amount: string) => `${buttonsIds.dropXp.base}${DYNAMIC_ID_SEPARATOR}${author}${DYNAMIC_ID_SEPARATOR}${amount}`,
    deconstruct: (id: string) => id.split(DYNAMIC_ID_SEPARATOR).slice(-2),
  },
  topLevel: {
    construct: (page: string, type: string) => `${buttonsIds.topLevel.pages}${DYNAMIC_ID_SEPARATOR}${page}${DYNAMIC_ID_SEPARATOR}${type}`,
    deconstruct: (id: string) => id.split(DYNAMIC_ID_SEPARATOR).slice(-2),
  },
  topLevelDetailed: {
    construct: (type: string) => `${buttonsIds.topLevel.detailed}${DYNAMIC_ID_SEPARATOR}${type}`,
    deconstruct: (id: string) => id.split(DYNAMIC_ID_SEPARATOR).slice(-1),
  },
  confirmConfirm: {
    construct: (subId: string, args: string) => `${buttonsIds.confirm.confirm}${DYNAMIC_ID_SEPARATOR}${subId}${DYNAMIC_ID_SEPARATOR}`
      + `${args}`,
    deconstruct: (id: string) => id.split(DYNAMIC_ID_SEPARATOR).slice(-2),
  },
  confirmCancel: {
    construct: (subId: string, args: string) => `${buttonsIds.confirm.cancel}${DYNAMIC_ID_SEPARATOR}${subId}${DYNAMIC_ID_SEPARATOR}`
      + `${args}`,
    deconstruct: (id: string) => id.split(DYNAMIC_ID_SEPARATOR).slice(-2),
  },
} satisfies Record<string, {
  construct: ButtonIdFunctionConstruct;
  deconstruct: ButtonIdFunctionDeconstruct;
}>;