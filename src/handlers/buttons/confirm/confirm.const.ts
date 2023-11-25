import type {ButtonId, ButtonIdFunctionConstruct, ButtonIdFunctionDeconstruct} from '$core/handlers/buttons';
import type {ConfirmButtonHandler} from '$core/handlers/buttons/confirm/confirm.type';
import {reverseXpMovement} from '$core/handlers/buttons/confirm/confirm_buttons/reverse_xp_movement.button';
import {announceEvent} from '$core/handlers/buttons/confirm/confirm_buttons/announce_event.button';
import {primeStaff} from '$core/handlers/buttons/confirm/confirm_buttons/prime_staff.button';

export const confirmIds = {
	cancel: 'cl',
	reverseXpMovement: 'rxm',
	announceEvent: 'ae',
	primeStaff: 'ps',
} as const satisfies Record<string, Record<string, ButtonId> | ButtonId>;


export const handlers = {
	rxm: reverseXpMovement,
	ae: announceEvent,
	ps: primeStaff,
} satisfies Record<Exclude<(typeof confirmIds)[keyof typeof confirmIds], 'cl'>, ConfirmButtonHandler>;


export const confirmArgs = {
	reverse_xp_movement: {
		construct: (id: string) => id,
		deconstruct: (args: string) => [args],
	},
} satisfies Record<string, {
	construct: ButtonIdFunctionConstruct;
	deconstruct: ButtonIdFunctionDeconstruct;
}>;