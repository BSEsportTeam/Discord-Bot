import {AnnounceEvent} from '$core/commands/guilds/global/announce_event/announce_event.class';
import type {BaseCommand} from '$core/commands/base_command.class';
import type {Client} from '$core/client';


/* eslint-disable */
export interface BaseCommandExtended  {
	new(client: Client): BaseCommand
}
export const commands: BaseCommandExtended[] = [
	AnnounceEvent
];