import {BaseCommand, sendCommandReply} from '$core/handlers/commands';
import {builder} from './top_level.builder';
import type {ChatInputCommandInteraction} from 'discord.js';
import type {Result} from 'rustic-error';
import type {CommandError} from '$core/utils/error';

export default class TopLevel extends BaseCommand {
	builder = builder.toJSON();

	run(interaction: ChatInputCommandInteraction): Promise<Result<boolean, CommandError>> {

		return sendCommandReply(interaction, {}, false);
	}
}