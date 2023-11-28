import type { ButtonInteraction, Message } from "discord.js";
import { ActionRowBuilder, ButtonBuilder, ComponentType, EmbedBuilder } from "discord.js";
import { logger } from "$core/utils/logger";
import { resultify } from "rustic-error";
import { colors } from "$core/config/global";
import { getMessage } from "$core/utils/function/string/string.util";

export const disableButtons = async(message: Message): Promise<void> => {
  try {
    const newComponents = [];

    for (const componentRow of message.components) {

      if (componentRow.type !== ComponentType.ActionRow) {
        newComponents.push(componentRow);
        continue;
      }

      const newActionRow = new ActionRowBuilder<ButtonBuilder>();
      for (const component of componentRow.components) {
        if (component.type !== ComponentType.Button) continue;
        newActionRow.addComponents(new ButtonBuilder(component.data).setDisabled(true));
      }

      if (newActionRow.components.length === 0) {
        newComponents.push(componentRow);
        continue;
      }

      newComponents.push(newActionRow);
    }

    await message.edit({
      components: newComponents,
    });
  } catch (e) {
    logger.error(`failed to disable buttons, error : ${e instanceof Error ? e.message : String(e)}`);
  }
};

export const authorOnly = async(interaction: ButtonInteraction): Promise<boolean> => {
  if (interaction.message.interaction?.user.id === interaction.user.id || interaction.memberPermissions?.has("Administrator")) {
    return true;
  }

  const result = await resultify(() => interaction.reply({
    embeds: [new EmbedBuilder()
      .setTitle(getMessage("button.authorOnly.title"))
      .setDescription(getMessage("button.authorOnly.description"))
      .setColor(colors.notAllowed)],
    ephemeral: true,
  }));

  if (!result.ok) {
    logger.error(`failed to Reply to interaction, error : ${result.error.message}`);
  }

  return false;
};