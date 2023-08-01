import type {CommandPreReply} from '$core/handlers/commands';
import {SubCommand} from '$core/handlers/commands';
import type {ChatInputCommandInteraction} from 'discord.js';
import {time, userMention} from 'discord.js';
import {CommandError} from '$core/utils/error';
import type {Result} from 'rustic-error';
import {error} from 'rustic-error';
import {commandsConfig} from '$core/config/message/command';
import {getXpMovement} from '$core/handlers/database/xp_movement/xp_movement.func';
import {errorEmbed, simpleEmbed} from '$core/utils/discord';
import {msgParams} from '$core/utils/function/string';
import {confirmIds, getConfirmButtons} from '$core/handlers/buttons/confirm';

const config = commandsConfig.admin;

export class ReverseXpMovement extends SubCommand {
	name = config.subcmds.reverse_xp_movement.name;
	preReply: CommandPreReply = {
		enable: true,
		ephemeral: false
	};

	async run(interaction: ChatInputCommandInteraction): Promise<Result<boolean, CommandError>> {
		const id = interaction.options.getInteger(config.subcmds.reverse_xp_movement.options.id.name);
		if (!id) {
			return error(new CommandError('No value in option id', interaction));
		}

		const xpMovement = await getXpMovement(id);
		if (!xpMovement.ok) {
			return error(new CommandError('Failed to get XP Movement', interaction, xpMovement.error));
		}

		if (xpMovement.value === null) {
			return this.sendReply(interaction, {
				embeds: [errorEmbed(
					config.exec.reverse_xp_movement.not_found.description,
					config.exec.reverse_xp_movement.not_found.tile)]
			});
		}

		return this.sendReply(interaction, {
			embeds: [
				simpleEmbed(msgParams(config.exec.reverse_xp_movement.infos.description, [
					xpMovement.value.id,
					xpMovement.value.xpAmount,
					userMention(xpMovement.value.byUserId),
					userMention(xpMovement.value.forUserId),
					xpMovement.value.guild.name,
					time(xpMovement.value.date, 'F'),
					xpMovement.value.cause,
					xpMovement.value.reason
				]), config.exec.reverse_xp_movement.infos.title).setFooter({
					text: config.exec.reverse_xp_movement.infos.label
				})], components: getConfirmButtons(confirmIds.reverse_xp_movement, null, `${id}`)
		});
	}
}