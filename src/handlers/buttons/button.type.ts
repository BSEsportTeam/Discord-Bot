import type {ButtonInteraction, Collection} from 'discord.js';
import type {Result} from 'rustic-error';
import type {ButtonError} from '$core/utils/error';

export type ButtonId = string;
export type ButtonIdFunctionConstruct = (...args: string[]) => string;
export type ButtonIdFunctionDeconstruct = (id: string) => string[];
export type ButtonIdFunction = ButtonIdFunctionDeconstruct|ButtonIdFunctionConstruct;

export type ButtonHandler = {
	id: ButtonId;
	name: string;
	/** @default true*/
	authorOnly?: boolean;
	/** @default true*/
	guildOnly?: boolean;
	/** @default false*/
	autoDisable?: boolean;
	/** @default false*/
	preReply?: boolean;
	/** @default false*/
	ephemeral?: boolean;
	run: (interaction: ButtonInteraction) => Promise<Result<boolean, ButtonError>>;
}

export type ButtonCollection = Collection<ButtonId, ButtonHandler>;