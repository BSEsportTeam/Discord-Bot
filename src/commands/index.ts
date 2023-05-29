import {AnnounceEvent} from '$core/commands/AnnounceEvent';
import type {BaseCommand} from '$core/commands/BaseCommand';
import type {Client} from '$core/Client';


/* eslint-disable */
export interface BaseCommandExtended  {
	new(client: Client): BaseCommand
}
export const commands: BaseCommandExtended[] = [
	AnnounceEvent
];