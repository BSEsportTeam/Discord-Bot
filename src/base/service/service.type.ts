import type {Service} from './service.class';
import type {Command} from '$core/base/command/command.class';

export type ServiceLoad = {
	load: () => Promise<void>;
} & Service

export type ServiceUnload = {
	unload: () => Promise<void>;
} & Service

export type CommandList<S extends Service> = Map<string, Command<S>>