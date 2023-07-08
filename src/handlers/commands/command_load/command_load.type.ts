import type {RESTPostAPIChatInputApplicationCommandsJSONBody} from 'discord-api-types/v10';
import type {Collection} from 'discord.js';
import type {GuildName} from '$core/config/guilds/guild.type';

export type CommandBuilt =  RESTPostAPIChatInputApplicationCommandsJSONBody;

export type GuildsCommandsBuild = Collection<GuildName, CommandBuilt[]>