import type { CommandError } from "$core/utils/error";
import type { Service } from "$core/base/service/service.class";
import type { SubCommand } from "$core/base/command/sub_command.class";

export type CommandResultInfosPassed = {
  pass: true;
}
export type CommandResultInfoFailed = {
  pass: false;
  failedRaison: FailsReasons;
  detailed?: string;
}
export type CommandResultInfos = CommandResultInfosPassed | CommandResultInfoFailed;

export type FailsReasons =
  "NO_PERMS"
  | "VALUE_NOT_FOUND"
  | "VALUE_NOT_VALID"
  | "COOLDOWN"
  | "UNKNOWN"
  | "NOT_IMPLEMENTED";

export type CommandResultErr = [false, CommandError];
export type CommandResultOk = [true, CommandResultInfos];
export type CommandResult = CommandResultErr | CommandResultOk;

export type GuildAlias = "all" | `${bigint}`;

export type SubCommandGroups<S extends Service> = Map<string, SubCommands<S>>
export type SubCommands<S extends Service> = Map<string, SubCommand<S>>