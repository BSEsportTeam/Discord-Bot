import type {DebugValues} from '$core/utils/logger/';
import type {ChatInputCommandInteraction} from 'discord.js';
import type {DebuggableError} from './error.type';
import {isDebuggableError} from './error.util';

export class CommandError extends Error implements DebuggableError {
	name = 'CommandError';
	constructor(
		message: string,
		public interaction: ChatInputCommandInteraction,
		public sourceError?: Error
	) {
		super(message.replaceAll('\n', ' ' + (sourceError ? `, error : ${sourceError.message} ` : '')));
	}
	debug(): DebugValues {
		const debug: DebugValues = {
			'command options': JSON.stringify(this.interaction.options.data),
			user: `${this.interaction.user.tag} (${this.interaction.user.id})`
		};
		if (this.interaction.inGuild() && this.interaction.guild !== null) debug.guild = `${this.interaction.guild.name} (${this.interaction.guildId})`;
		if (this.interaction.channel !== null && !this.interaction.channel.isDMBased()) debug.channel = `${this.interaction.channel.name} (${this.interaction.channelId})`;
		if (this.sourceError !== undefined) debug['cmd origin message'] = this.sourceError.message;
		if (this.sourceError !== undefined && isDebuggableError(this.sourceError)) return {...debug, ...this.sourceError.debug()};
		return debug;
	}
}