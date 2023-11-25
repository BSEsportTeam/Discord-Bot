import type { AutocompleteInteraction, Interaction } from "discord.js";
import { resultify } from "rustic-error";
import { errorEmbed } from "$core/utils/discord/embet/embet.func";
import { messageConfig } from "$core/config/message";
import { logger } from "$core/utils/logger";
import { forground256Color } from "tintify";

export const replyError = async (interaction: Exclude<Interaction, AutocompleteInteraction>, ephemeral: boolean, preReplied: boolean) => {
  if (preReplied) {

    const result = await resultify(() => interaction.editReply({
      embeds: [errorEmbed(messageConfig.interactionHandler.error.description, messageConfig.interactionHandler.error.title)],
    }));

    if (!result.ok) {
      logger.error("failed to interaction error editReply, error : " + forground256Color(202) + result.error.message);
    }

  } else {
    const result = await resultify(() => interaction.reply({
      embeds: [errorEmbed(messageConfig.interactionHandler.error.description, messageConfig.interactionHandler.error.title)],
      ephemeral: ephemeral,
    }));

    if (!result.ok) {
      logger.error("failed to interaction error reply, error : " + forground256Color(202) + result.error.message);
    }
  }
};