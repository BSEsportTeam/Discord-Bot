import type { ChatInputCommandInteraction } from "discord.js";
import { client } from "$core/index";
import type { NormalCommand } from "$core/handlers/commands";
import type { SubCommand } from "$core/handlers/commands/sub_command.class";
import { serializeCommandName } from "$core/handlers/commands/command.util";
import { getGuildWithId } from "$core/config/guilds";
import { isDev } from "$core/config/env";

export const getCommand = (interaction: ChatInputCommandInteraction): NormalCommand | SubCommand | null => {
  if (isDev) {
    let command = client.commands.get(serializeCommandName(
      interaction.commandName,
      "all",
      interaction.options.getSubcommand(false) || undefined,
      interaction.options.getSubcommandGroup() || undefined
    ));

    if (typeof command === "undefined") {
      command = client.commands.get(serializeCommandName(
        interaction.commandName,
        "global",
        interaction.options.getSubcommand(false) || undefined,
        interaction.options.getSubcommandGroup() || undefined
      ));
    }

    return command || null;
  }

  if (interaction.inGuild() && interaction.guild !== null) {
    let command = client.commands.get(serializeCommandName(
      interaction.commandName,
      getGuildWithId(interaction.guild.id)?.name || "all",
      interaction.options.getSubcommand(false) || undefined,
      interaction.options.getSubcommandGroup() || undefined
    ));

    if (typeof command === "undefined") {
      command = client.commands.get(serializeCommandName(
        interaction.commandName,
        "all",
        interaction.options.getSubcommand(false) || undefined,
        interaction.options.getSubcommandGroup() || undefined
      ));
    }

    if (typeof command !== "undefined") {
      return command;
    }

  } else {
    const command = client.commands.get(serializeCommandName(
      interaction.commandName,
      "all",
      interaction.options.getSubcommand(false) || undefined,
      interaction.options.getSubcommandGroup() || undefined
    ));
    if (typeof command !== "undefined") {
      return command;
    }
  }
  return null;
};