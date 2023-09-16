import type {Command} from '$core/base/command/command.class';
import type {Service} from '$core/base/service/service.class';
import type {Client} from '$core/client';

export abstract class SubCommand<S extends Service> {
	readonly baseCommand: Command<S>;
	readonly client: Client;
	readonly service: S;

	protected constructor(command: Command<S>) {
		this.baseCommand = command;
		this.client = command.client;
		this.service = command.service;
	}
}