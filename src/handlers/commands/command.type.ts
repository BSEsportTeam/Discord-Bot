import type {GuildAlias, NormalCommand} from '$core/commands/command.type';
import type {Collection} from 'discord.js';
import type {SubCommand} from '$core/commands/sub_command.class';

export type CommandString = `${GuildAlias}.${string}`;

export type CommandCollection = Collection<CommandString, NormalCommand|SubCommand>;