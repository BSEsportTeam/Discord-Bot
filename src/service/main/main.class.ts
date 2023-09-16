import {Service} from '$core/base/service/service.class';

// admin commands
// xp system
export class MainService extends Service {
	name = 'main';
	version = '1.0.0';


	// main service must be never reload
	async reload(): Promise<boolean> {
		return false;
	}
}