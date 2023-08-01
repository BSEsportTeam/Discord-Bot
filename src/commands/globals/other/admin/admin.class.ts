import type {SubCommandOptions} from '$core/handlers/commands';
import {BaseCommand} from '$core/handlers/commands';
import {builder} from './admin.builder';
import {commandsConfig} from '$core/config/message/command';
import {ReverseXpMovement} from '$core/commands/globals/other/admin/reverse_xp_movement/reverse_xp_movement.class';
import {Dev} from '$core/utils/dev';

@Dev
export default class Admin extends BaseCommand {
	builder = builder.toJSON();

	getSubCommands(): SubCommandOptions {
		return {
			[commandsConfig.admin.subcmds.reverse_xp_movement.name]: new ReverseXpMovement()
		};
	}
}