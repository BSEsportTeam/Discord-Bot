import type {Service} from './service.class';
import type {Task} from '$core/handlers/task';

export interface ServiceLoad extends Service {
	load(): Promise<void>;
}

export interface ServiceUnload extends Service {
	unload(): Promise<void>;
}

export type TaskList = Map<string, Task<null>>