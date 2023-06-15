import type {DevFacultative} from '$core/utils/dev';
import type {MultipleCronInterval, TaskInterval, TaskType} from '$core/handlers/task/task.type';
import type {MaybePromise} from '$core/utils/type';

export abstract class Task<T> implements DevFacultative {
	abstract type: TaskType;
	abstract interval: TaskInterval|MultipleCronInterval<T>[];
	
	isEnableInDev = false;

	abstract onTick(options?: T): MaybePromise<void>;

}