import type { Command } from "$core/base/command";
import type { Service } from "$core/base/service";
import type { RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord-api-types/v10";
import { isDev } from "$core/config/env";

export const commandMapToAPIArray = (commands: Map<string, Command<Service>>): RESTPostAPIChatInputApplicationCommandsJSONBody[] => {
  if (isDev) {
    return [...commands.values()].filter(cmd => cmd.isEnableInDev).map(command => command.toJSON());
  }

  return [...commands.values()].map(command => command.toJSON());
};