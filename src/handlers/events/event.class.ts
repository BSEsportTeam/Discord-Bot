import type { EventName } from "$core/handlers/events/event.type";
import type { DevFacultative } from "$core/utils/dev/dev.type";
import type { ClientEvents } from "discord.js";

export abstract class Event<T extends EventName> implements DevFacultative {

  isEnableInDev = false;

  abstract name: T

  abstract run(...args: ClientEvents[T]): Promise<void> | void;

}