import type {ButtonInteraction} from 'discord.js';
import type {Result} from 'rustic-error';
import type {ButtonError} from '$core/utils/error';
import type {ButtonHandler} from '$core/handlers/buttons';

export type ConfirmFunc = (interaction: ButtonInteraction, ...args: string[]) => Promise<Result<boolean, ButtonError>>;
export type CancelFunc = ConfirmFunc | null;

export type ConfirmButtonHandler = {
	confirm: ConfirmFunc;
	cancel: CancelFunc;
} & Omit<ButtonHandler, 'run' | 'id'>