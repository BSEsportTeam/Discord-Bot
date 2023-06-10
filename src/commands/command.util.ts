import type {BaseCommand} from './base_command.class';
import type {NormalCommand, SubsCommand} from './command.type';

export const isNormalCommand = (cmd: BaseCommand): cmd is NormalCommand => {
	return 'run' in cmd;
};
export const isSubCommands = (cmd: BaseCommand): cmd is SubsCommand => {
	return 'getSubCommands' in cmd;
};
