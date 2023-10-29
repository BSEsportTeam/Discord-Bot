import type {Service} from './service.class';
import type {Command} from '$core/base/command/command.class';

export interface ServiceLoad extends Service {
	load(): Promise<void>;
}

export interface ServiceUnload extends Service {
	unload(): Promise<void>;
}

export type CommandList<S extends Service> = Map<string, Command<S>>
