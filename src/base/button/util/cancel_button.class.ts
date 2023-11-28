import { Button } from "$core/base/button/button.class";
import type { Service } from "$core/base/service";
import { buttonsIds } from "$core/base/button/button.const";
import type { ButtonInteraction } from "discord.js";
import type { ButtonResult } from "$core/base/button/button.type";
import { anyToError, ButtonError } from "$core/utils/error";
import { getMessage } from "$core/utils/function/string/string.util";

export class CancelButton<S extends Service> extends Button<S> {

  name = "cancel";

  id = buttonsIds.cancel;

  ephemeral = true;

  authorOnly = true;

  autoDisable = true;

  async run(interaction: ButtonInteraction): Promise<ButtonResult> {
    try {
      return this.sendReply(interaction, {
        content: getMessage("button.confirmSystem.cancelMessage"),
      });
    } catch (error) {
      return [false, new ButtonError("failed to cancel", interaction, anyToError(error))];
    }
  }

}