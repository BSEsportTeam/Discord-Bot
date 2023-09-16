import type {GuildName} from '$core/config/guilds';

export type GuildAlias = 'all' | GuildName;

export type CommandType = 'chatinput' | 'profil' | ''

type BaseRunContext = {
	type: CommandType;

}

export type ChatInputRunContext = BaseRunContext & {}