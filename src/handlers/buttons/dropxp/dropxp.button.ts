import type { ButtonHandler } from "$core/handlers/buttons";
import { buttonsDynamicIds, buttonsIds, disableButtons } from "$core/handlers/buttons";
import type { ButtonInteraction } from "discord.js";
import { ButtonError } from "$core/utils/error";
import type { Result } from "rustic-error";
import { error, ok, resultify } from "rustic-error";
import { isTake, setTake } from "$core/handlers/buttons/dropxp/dropxp.util";
import { baseEmbed, simpleEmbed } from "$core/utils/discord/embet/embet.func";
import { commandsConfig } from "$core/config/message/command";
import { colors } from "$core/config/global";
import { addXp } from "$core/utils/xp";
import { XpMovementCause } from "@prisma/client";
import { msgParams } from "$core/utils/function/string";
import { logger } from "$core/utils/logger";

const button: ButtonHandler = {
  id: buttonsIds.dropXp.base,
  name: "dropxp",
  ephemeral: true,
  authorOnly: false,
  async run(interaction: ButtonInteraction): Promise<Result<boolean, ButtonError>> {
    if (interaction.guildId === null) return ok(false);
    const guildId = interaction.guildId;


    const infos = buttonsDynamicIds.dropXp.deconstruct(interaction.customId);
    const [author, xp] = [infos[0], parseInt(infos[1], 10)];

    if (interaction.user.id === author) {
      const result = await resultify(() => interaction.reply({
        ephemeral: true,
        embeds: [baseEmbed(commandsConfig.dropXp.exec.noAuthor).setColor(colors.notAllowed)],
      }));

      if (!result.ok) {
        return error(new ButtonError(`failed to reply to button interaction, error : ${result.error.message}`, interaction, result.error));
      }
      return ok(false);
    }

    const result1 = await resultify(() => interaction.deferUpdate());
    if (!result1.ok) {
      return error(new ButtonError(`failed to deferUpdate to button interaction, error : ${result1.error.message}`, interaction, result1.error));
    }

    if (isTake(interaction.message.id)) {
      return ok(false);
    }

    setTake(interaction.message.id);
    void disableButtons(interaction.message);


    const embed = simpleEmbed(
      msgParams(commandsConfig.dropXp.exec.claimed, [interaction.user.toString(), xp])
    );

    const result = await resultify(() => interaction.message.reply({ embeds: [embed] }));

    if (!result.ok) {
      logger.error(`failed to reply to message, error : ${result.error.message}`);
    }
    const xpResult = await addXp(interaction.user.id, guildId, xp, XpMovementCause.XPDROP, author);
    if (!xpResult.ok) {
      logger.error(`failed to add xp to member after dropxp, error : ${xpResult.error.message}`);
    }
    return ok(false);
  },

};

export default [
  button,
];