import type {DevFacultative} from '$core/utils/dev';
import type {TaskInterval, TaskType} from '$core/handlers/task/task.type';
import type {MaybePromise} from '$core/utils/type';

export abstract class Task implements DevFacultative {
	abstract type: TaskType;
	abstract interval: TaskInterval;
	
	isEnableInDev = false;

	abstract onTick(): MaybePromise<void>;

}