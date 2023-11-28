import type { ConfirmButtonHandler } from "$core/handlers/buttons/confirm";
import type { ButtonInteraction } from "discord.js";
import { ButtonError } from "$core/utils/error";
import type { Result } from "rustic-error";
import { error, ok, resultify } from "rustic-error";
import { getXpMovement } from "$core/handlers/database/xp_movement/xp_movement.func";
import { addXp } from "$core/utils/xp";
import { inverseNumber } from "$core/utils/function/number/number.util";
import { simpleEmbed } from "$core/utils/discord";
import { commandsConfig } from "$core/config/message/command";
import { interactionReplyError } from "$core/handlers/buttons";

export const reverseXpMovement: ConfirmButtonHandler = {
  name: "confirmReverseXpMovement",
  authorOnly: true,
  guildOnly: true,
  preReply: true,
  confirm: async(interaction: ButtonInteraction, id: string): Promise<Result<boolean, ButtonError>> => {
    if (!interaction.guildId) {
      return ok(false);
    }
    const xpMovement = await getXpMovement(parseInt(id, 10));
    if (!xpMovement.ok) {
      return error(new ButtonError("Failed to get XP Movement", interaction, xpMovement.error));
    }

    if (xpMovement.value === null) {
      return error(new ButtonError(`No xp movement found with id ${id}`, interaction));
    }

    const result = await addXp(
      xpMovement.value.forUserId,
      xpMovement.value.guild.id,
      inverseNumber(xpMovement.value.xpAmount),
      "REVERSE",
      interaction.user.id,
      `reserve xp movement with id ${xpMovement.value.id}`
    );

    if (!result.ok) {
      return error(new ButtonError("failed to reverse xp", interaction, result.error));
    }

    const msgResult = await resultify(() => interaction.editReply({
      embeds: [simpleEmbed(commandsConfig.admin.exec.reverseXpMovement.succes)],
    }));
    if (!msgResult.ok) {
      return error(interactionReplyError(interaction, msgResult.error));
    }
    return ok(true);
  },
  cancel: null,
};