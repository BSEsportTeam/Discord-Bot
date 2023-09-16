import type {Service} from '$core/base/service/service.class';
import type {ServiceLoad, ServiceUnload} from '$core/base/service/service.type';

export const serviceHasLoad = (service: Service): service is ServiceLoad => {
	return 'load' in service && typeof service['load'] === 'function';
};

export const serviceHasUnload = (service: Service): service is ServiceUnload => {
	return 'unload' in service && typeof service['unload'] === 'function';
};