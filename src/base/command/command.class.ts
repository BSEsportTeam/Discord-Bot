import type { Client } from "$core/client";
import type { Service } from "$core/base/service/service.class";
import type { CommandResult, GuildAlias, SubCommandGroups, SubCommands } from "$core/base/command/command.type";
import type { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import type { RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord-api-types/v10";

export abstract class Command<S extends Service> {

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


  protected constructor(client: Client, service: S) {
    this.client = client;
    this.service = service;
  }

  toJSON(): RESTPostAPIChatInputApplicationCommandsJSONBody {
    return this.slashBuilder.toJSON();
  }

  abstract run(interaction: ChatInputCommandInteraction): Promise<CommandResult>;

  protected async preRun(interaction: ChatInputCommandInteraction): Promise<void> {
    if (this.cooldown > 0) {
      const now = Date.now();
      const cooldown = this.cooldowns.get(interaction.user.id);
      if (cooldown && cooldown > now) {
        await interaction.reply({
          content: "You are on cooldown., need to wait " + Math.ceil((cooldown - now) / 1000) + " seconds.",
          ephemeral: true,
        });
        return;
      }
      const msCooldown = this.cooldown * 1000;
      this.cooldowns.set(interaction.user.id, now + msCooldown);
    }
    const [ok, infos] = await this.run(interaction);
    if (ok) {
      if (infos.pass) {
        this.service.log.info(`${interaction.user.username} executed ${this.name} command with success.`);
      } else {
        this.service.log.info(`${interaction.user.username} executed ${this.name} command, but failed, code :`
          + ` ${infos.failedRaison} ${infos.detailed ? "(" + infos.detailed + ")" : ""}`);
      }
    }
  }

}