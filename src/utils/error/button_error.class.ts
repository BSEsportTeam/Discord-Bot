import type {ButtonInteraction} from 'discord.js';
import type {ButtonDebugs, DebuggableError} from './error.type';
import type {DebugValues} from '$core/utils/logger/';
import {isDebuggableError} from '$core/utils/error/error.util';

export class ButtonError extends Error implements DebuggableError {
	constructor(
		message: string,
		public interaction: ButtonInteraction,
		public sourceError?: Error
	) {
		super(message);
	}
	debug(): DebugValues {
		const debug: ButtonDebugs = {
			user: `${this.interaction.user.tag} (${this.interaction.user.id})`,
			customId: this.interaction.customId
		};
		if (this.interaction.inGuild() && this.interaction.guild !== null) debug.guild = `${this.interaction.guild.name} (${this.interaction.guildId})`;
		if (this.interaction.channel !== null && !this.interaction.channel.isDMBased()) debug.channel = `${this.interaction.channel.name} (${this.interaction.channelId})`;
		if (this.sourceError !== undefined && isDebuggableError(this.sourceError)) return {...debug, ...this.sourceError.debug()};
		return debug;
	}
}