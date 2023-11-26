import type { Command } from "$core/base/command";
import type { Service } from "$core/base/service";
import type { RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord-api-types/v10";
import { isDev } from "$core/config/env";
import type { GuildApplicationCommandManager } from "discord.js";
import type { Client } from "$core/client";

export const commandMapToAPIArray = (commands: Map<string, Command<Service>>): RESTPostAPIChatInputApplicationCommandsJSONBody[] => {
  if (isDev) {
    return [...commands.values()].filter(cmd => cmd.isEnableInDev).map(command => command.toJSON());
  }

  return [...commands.values()].map(command => command.toJSON());
};

export const getApplicationCommandManager = (client: Client, guildId: string): GuildApplicationCommandManager => {
  const manager = client.guilds.cache.get(guildId)?.commands;
  if (!manager) {
    client.logger.fatal({
      m: "failed to find application command manager in guild" + guildId,
      e: new Error("manager not found"),
      d: {
        botId: client.user?.id,
        guildId: guildId,
      },
    });
    //never run
    throw new Error("manager not found");
  }
  return manager;
};