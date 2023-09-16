import {Service} from '$core/base/service/service.class';
import type {Client} from '$core/client';

export class BrawlStarsService extends Service {
	name = 'brawl_stars';
	version = '1.0.0';

	constructor(client: Client) {
		super(client);
	}
}