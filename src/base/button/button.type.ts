import type { ButtonError } from "$core/utils/error";
import type { CommandResultOk } from "$core/base/command";

export type ButtonResultError = [false, ButtonError];
export type ButtonResult = CommandResultOk | ButtonResultError;