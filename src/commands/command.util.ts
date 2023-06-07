import type {BaseCommand} from 'src/commands/base_command.class';
import type {NormalCommand, SubsCommand} from 'src/commands/command.type';

export const isNormalCommand = (cmd: BaseCommand): cmd is NormalCommand => {
	return 'run' in cmd;
};
export const isSubCommands = (cmd: BaseCommand): cmd is SubsCommand => {
	return 'getSubCommands' in cmd;
};