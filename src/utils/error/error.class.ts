import type {DebugValues} from '$core/utils/logger';
import type {ChatInputCommandInteraction} from 'discord.js';

export interface DebuggableError {
	debug(): DebugValues;
}
export interface CommandDebugsBase extends DebugValues {
	'command options': string;
	user: string;
	channel: string
	guild: string
}

export type CommandDebugs = CommandDebugsBase|Omit<CommandDebugsBase, 'channel'|'guild'>

export class CommandError extends Error implements DebuggableError {
	interaction: ChatInputCommandInteraction;
	constructor(
		message: string,
		interaction: ChatInputCommandInteraction
	) {
		super(message);
		this.interaction = interaction;
	}
	debug(): DebugValues {
		const debug: CommandDebugs = {
			'command options': JSON.stringify(this.interaction.options.data),
			user: `${this.interaction.user.tag} (${this.interaction.user.id})`
		};
		if (this.interaction.inGuild() && this.interaction.guild !== null) debug.guild = `${this.interaction.guild.name} (${this.interaction.guildId})`;
		if (this.interaction.channel !== null && !this.interaction.channel.isDMBased()) debug.channel = `${this.interaction.channel.name} (${this.interaction.channelId})`;
		return debug;
	}
}