import type { Client } from "$core/client";
import type { Service } from "$core/base/service/service.class";
import type { CommandResult, GuildAlias, SubCommandGroups, SubCommands } from "$core/base/command/command.type";
import type {
  ChatInputCommandInteraction,
  InteractionEditReplyOptions,
  InteractionReplyOptions,
  SlashCommandBuilder
} from "discord.js";
import { EmbedBuilder } from "discord.js";
import type { RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord-api-types/v10";
import { anyToError, CommandError } from "$core/utils/error";
import { getMessage } from "$core/utils/function/string/string.util";
import { colors } from "$core/config/global";
import type { DevFacultative } from "$core/utils/dev";

export abstract class Command<S extends Service> implements DevFacultative {

  readonly client: Client;

  readonly service: S;

  guild: GuildAlias = "all";

  abstract name: string;

  abstract slashBuilder: SlashCommandBuilder;

  subCommandGroups: SubCommandGroups<S> = new Map();

  subCommands: SubCommands<S> = new Map();

  ephemeral = false;

  preReply = false;

  cooldown = 0;

  cooldowns: Map<string, number> = new Map();

  id: string | undefined;

  isEnableInDev: boolean = false;

  constructor(client: Client, service: S) {
    this.client = client;
    this.service = service;
  }

  toJSON(): RESTPostAPIChatInputApplicationCommandsJSONBody {
    return this.slashBuilder.toJSON();
  }

  abstract run(interaction: ChatInputCommandInteraction): Promise<CommandResult>;

  async preRun(interaction: ChatInputCommandInteraction): Promise<void> {
    if (this.cooldown > 0) {
      const now = Date.now();
      const cooldown = this.cooldowns.get(interaction.user.id);
      if (cooldown && cooldown > now) {
        await interaction.reply({
          content: getMessage("command.cooldown", [
            Math.ceil((cooldown - now) / 1000),
          ]),
          ephemeral: true,
        });
        return;
      }
      const msCooldown = this.cooldown * 1000;
      this.cooldowns.set(interaction.user.id, now + msCooldown);
    }

    if (this.preReply) {
      try {
        await interaction.deferReply({ ephemeral: this.ephemeral });
      } catch (error) {
        this.service.log.error({
          m: "failed to defer reply",
          e: anyToError(error),
        });
      }
      return;
    }

    const [ok, infos] = await this.run(interaction);
    if (ok) {
      if (infos.pass) {
        this.service.log.info(`${interaction.user.username} executed ${this.name} command with success.`);

      } else {
        this.service.log.info(`${interaction.user.username} executed ${this.name} command, but failed, code :`
          + ` ${infos.failedRaison} ${infos.detailed ? "(" + infos.detailed + ")" : ""}`);

      }
    } else {
      this.service.log.error({
        m: `${interaction.user.username} failed to execute ${this.name} command`,
        e: infos,
        d: infos.debug(),
      });

      try {
        await interaction.reply({
          content: getMessage("command.error"),
          embeds: [
            new EmbedBuilder()
              .setTitle(getMessage("command.error.title"))
              .setDescription(getMessage("command.error.description"))
              .setColor(colors.error),
          ],
          ephemeral: true,
        });

      } catch (error) {
        this.service.log.error({
          m: "failed to send error message",
          e: anyToError(error),
        });
      }
    }
  }

  async sendReply(interaction: ChatInputCommandInteraction, options:  InteractionReplyOptions | InteractionEditReplyOptions):
    Promise<CommandResult> {
    try {
      if (this.preReply) {
        await interaction.editReply(options as InteractionEditReplyOptions);
        return [true, { pass: true }];
      }
      await interaction.reply({ ...{ ephemeral: this.ephemeral }, ...options as InteractionReplyOptions });
      return [true, { pass: true }];
    } catch (error) {
      return [false, new CommandError("failed to send reply", interaction, anyToError(error))];
    }
  }

}