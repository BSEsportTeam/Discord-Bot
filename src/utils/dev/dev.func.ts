import type {DevFacultative} from './dev.type';

export const Dev = <T extends { new (...args: any[]): DevFacultative}>(target: T) => {
	return class extends target {
		isEnableInDev = true;
	};
};