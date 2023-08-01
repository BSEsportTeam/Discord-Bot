import type {RESTPostAPIChatInputApplicationCommandsJSONBody} from 'discord-api-types/v10';
import type {DevFacultative} from '$core/utils/dev/dev.type';
import type {CommandPreReply, GuildAlias, UnknownCommand} from '$core/handlers/commands/command.type';
import type {ChatInputCommandInteraction, InteractionEditReplyOptions, InteractionReplyOptions} from 'discord.js';
import type {Result} from 'rustic-error';
import {error, ok, resultify} from 'rustic-error';
import {CommandError} from '$core/utils/error';


export abstract class BaseCommand implements UnknownCommand, DevFacultative {
	guild: GuildAlias = 'all';
	preReply: CommandPreReply = {
		enable: false,
		ephemeral: false
	};
	abstract builder: RESTPostAPIChatInputApplicationCommandsJSONBody;
	isEnableInDev = false;

	async sendReply(interaction: ChatInputCommandInteraction, options: InteractionReplyOptions | InteractionEditReplyOptions):
		Promise<Result<boolean, CommandError>> {
		if (this.preReply.enable) {
			const result = await resultify(() => interaction.editReply(options as InteractionEditReplyOptions));

			if (!result.ok) {
				return error(new CommandError('failed to reply to interaction', interaction, result.error));
			}

			return ok(true);
		}
		const result = await resultify(() => interaction.reply(options as InteractionReplyOptions));

		if (!result.ok) {
			return error(new CommandError('failed to reply to interaction', interaction, result.error));
		}

		return ok(true);
	}
}