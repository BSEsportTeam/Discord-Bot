import type {Client} from '$core/client';
import {serviceHasLoad, serviceHasUnload} from '$core/base/service/service.util';
import {logger} from '$core/utils/logger';
import {anyToError} from '$core/utils/error';

export abstract class Service {
	client: Client;
	abstract name: string;
	abstract version: string;

	protected constructor(client: Client) {
		this.client = client;
	}

	async reload(): Promise<boolean> {
		await this.preUnload();
		return this.preLoad();
	}

	protected async preLoad(): Promise<boolean> {
		logger.info(`loading ${this.name} (v${this.version})`);
		if (serviceHasLoad(this)) {
			try {
				await this.load();
			} catch (e) {
				logger.error(`failed to load service ${this.name} (v${this.version})`);
				logger.debugValues({
					error: anyToError(e).message
				});
				return false;
			}
		}
		logger.info(`loaded ${this.name} (v${this.version})`);
		return true;
	}

	protected async preUnload() {
		logger.info(`unloading ${this.name} (v${this.version})`);
		if (serviceHasUnload(this)) {
			try {
				await this.unload();
			} catch (e) {
				logger.error(`failed to unload service ${this.name} (v${this.version})`);
				logger.debugValues({
					error: anyToError(e).message
				});
				return;
			}
		}
		logger.info(`unloaded ${this.name} (v${this.version})`);
	}

}