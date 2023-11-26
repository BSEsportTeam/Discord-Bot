import type { Service } from "$core/base/service";
import type { ButtonInteraction, InteractionEditReplyOptions, InteractionReplyOptions } from "discord.js";
import type { ButtonResult } from "$core/base/button/button.type";
import { anyToError, ButtonError } from "$core/utils/error";
import { authorOnly, disableButtons } from "./button.util";
import { isDev } from "$core/config/env";

export abstract class Button<S extends Service> {


  abstract name: string;

  abstract id: string;

  preReply = false;

  ephemeral = false;

  authorOnly = false;

  autoDisable = true;

  protected constructor(protected readonly service: S) {
  }

  abstract run(interaction: ButtonInteraction): Promise<ButtonResult>;

  async sendReply(interaction: ButtonInteraction, options:  InteractionReplyOptions | InteractionEditReplyOptions):
    Promise<ButtonResult> {
    try {
      if (this.preReply) {
        await interaction.editReply(options as InteractionEditReplyOptions);
        return [true, { pass: true }];
      }
      await interaction.reply({ ...{ ephemeral: this.ephemeral }, ...options as InteractionReplyOptions });
      return [true, { pass: true }];
    } catch (error) {
      return [false, new ButtonError("failed to send reply", interaction, anyToError(error))];
    }
  }

  protected async preRun(interaction: ButtonInteraction): Promise<void> {
    if (this.authorOnly) {
      const result = await authorOnly(interaction);
      if (!result) {
        return;
      }
    }

    if (this.preReply) {
      try {
        await interaction.deferReply({
          ephemeral: this.ephemeral,
        });

      } catch (error) {
        this.service.log.error({
          m: "failed to defer reply",
          e: anyToError(error),
          d: new ButtonError("failed to defer reply", interaction).debug(),
        });
      }
    }

    if (this.autoDisable) {
      await disableButtons(interaction.message);
    }

    const [ok, info] = await this.run(interaction);
    if (ok && isDev) {
      if (info.pass) {
        this.service.log.info(`${interaction.user.username} executed ${this.name} button with success.`);
      } else {
        this.service.log.info(`${interaction.user.username} executed ${this.name} button, but failed, code :`
          + ` ${info.failedRaison} ${info.detailed ? "(" + info.detailed + ")" : ""}`);
      }
    } else if (!ok) {
      this.service.log.error({
        m: `${interaction.user.username} failed to execute ${this.name} button`,
        e: info,
        d: info.debug(),
      });
    }
  }

}