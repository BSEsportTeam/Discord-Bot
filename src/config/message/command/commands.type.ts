import type {BaseMessage} from '$core/config/message/message.type';

export type Commands = Record<string, Command>

export type Command = Base & {
	groups?: Record<string, SubCommandGroup>;
	subcmds?: Record<string, SubCommand>;
	options?: Record<string, Base>;
	exec?: Record<string, BaseMessage>;
	other?: Record<string, OtherOption>
};

export type SubCommandGroup = Base & {
	subcmds: Record<string, SubCommand>;
}

export type SubCommand = Base & {
	options?: Record<string, Base>;
}

export type Base = {
	name: string;
	description: string;
}

export type OtherOption = string|number|{[key: string]: OtherOption}|OtherOption[];