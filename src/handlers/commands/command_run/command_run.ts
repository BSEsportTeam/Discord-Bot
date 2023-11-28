import type { ChatInputCommandInteraction } from "discord.js";
import { getCommand } from "$core/handlers/commands/command_run/command_run.util";
import { logger } from "$core/utils/logger";
import { resultify } from "rustic-error";
import { effect, effectReset, forground256Color } from "tintify";
import { isDev } from "$core/config/env";
import { replyError } from "$core/utils/discord/other/interaction";

export const commandRun = async(interaction: ChatInputCommandInteraction) => {
  const command = getCommand(interaction);

  if (command === null) {
    if (isDev) {
      return;
    }

    logger.warning("get command interaction for command that don't exist, command name : " + interaction.commandName);
    return;
  }

  if (command.preReply.enable) {
    const result = await resultify(() => interaction.deferReply({
      ephemeral: command.preReply.ephemeral,
    }));

    if (!result.ok) {
      await replyError(interaction, command.preReply.ephemeral, command.preReply.enable);
      return;
    }
  }

  const result = await command.run(interaction);

  const commandName = interaction.commandName
    + (interaction.options.getSubcommandGroup() !== null ? "." + interaction.options.getSubcommandGroup() : "")
    + (interaction.options.getSubcommand(false) !== null ? "." + interaction.options.getSubcommand(false) : "");
  if (!result.ok) {
    logger.error(`Error with command ${effect.bold + commandName.toLocaleUpperCase() + effectReset.bold} : ${forground256Color(202)}${result.error.message}`, result.error.debug());

    await replyError(interaction, command.preReply.ephemeral, command.preReply.enable);
  } else {
    logger.info(`COMMANDS RUN: ${interaction.user.username} used command ${commandName}, result : ${result.value ? "success" : "failed"}`);
  }
};