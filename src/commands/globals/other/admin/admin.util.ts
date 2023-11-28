import type { ChatInputCommandInteraction } from "discord.js";
import type { Result } from "rustic-error";
import { ok } from "rustic-error";
import type { CommandError } from "$core/utils/error";
import { globalConfig } from "$core/config/global";
import { sendCommandReply } from "$core/handlers/commands";
import { errorEmbed } from "$core/utils/discord";
import { commandsConfig } from "$core/config/message/command";

/**
 * If is owner, return false for code facility
 */
export const ownerOnly = async(interaction: ChatInputCommandInteraction, defer = true): Promise<Result<boolean, CommandError>> => {
  if (!globalConfig.owners.includes(interaction.user.id)) {
    return sendCommandReply(interaction, { embeds: [errorEmbed(commandsConfig.admin.exec.ownerOnly)] }, defer);
  }
  return ok(false);
};