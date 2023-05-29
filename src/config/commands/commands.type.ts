export type CommandsConfig = {
	name: string;
	description: string;
	options?: Record<string, CommandOptionConfig>;
	messages?: Record<string, CommandOtherConfig>;
	other?: Record<string, CommandOtherConfig>;
}
export type CommandOptionConfig = {
	name: string;
	description: string;
}
export type CommandOtherConfig = string | { [key: string]: CommandOtherConfig }