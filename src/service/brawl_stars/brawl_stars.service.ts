import {Service} from '$core/base/service/service.class';
import type {Client} from '$core/client';

export class BrawlStarsService extends Service {

	name = 'brawl_stars';

	constructor(client: Client) {
		super(client);
	}

}