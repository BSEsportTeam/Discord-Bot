import type { Client } from "$core/client";
import type { Command } from "$core/base/command/";
import type { Service } from "$core/base/service";
import { anyToError } from "$core/utils/error";
import { commandMapToAPIArray } from "$core/manager/command/command.util";
import { isDev } from "$core/config/env";
import { Routes } from "discord-api-types/v10";
import { devConfig } from "$core/config/dev/dev.config";

export class CommandManager {

  globalCommands: Map<string, Command<Service>> = new Map();

  guildCommands: Map<string, Map<string, Command<Service>>> = new Map();

  commandsRun: Map<string, Command<Service>> = new Map();

  constructor(public readonly client: Client) {

  }

  addCommand(command: Command<Service>): void {
    if (command.guild === "all") {
      this.globalCommands.set(command.name, command);
    } else {
      const guildId = isDev ? devConfig.guilds.section.id : command.guild;
      const guildCommands = this.guildCommands.get(guildId) ?? new Map<string, Command<Service>>();
      guildCommands.set(command.name, command);
      this.guildCommands.set(guildId, guildCommands);
    }

    this.commandsRun.set(command.name, command);
  }

  getCommand(name: string): Command<Service> | undefined {
    return this.commandsRun.get(name);
  }

  async loadCommands(): Promise<void> {
    await Promise.all([
      this.loadGlobalCommands(),
      this.loadGuildCommands(),
    ]);
  }

  private async loadGlobalCommands(): Promise<void> {
    const commands = commandMapToAPIArray(this.globalCommands);
    if (commands.length === 0) {
      return;
    }
    try {
      if (isDev) {
        await this.client.rest.put(Routes.applicationGuildCommands(this.client.user?.id ?? "error", devConfig.guilds.all.id), {
          body: commands,
        });

      } else {
        await this.client.rest.put(Routes.applicationCommands(this.client.user?.id ?? "error"), {
          body: commands,
        });

        this.client.logger.info(`register ${commands.length} globals commands with success`);
      }
    } catch (error) {
      this.client.logger.fatal({
        m: "failed to load global commands",
        e: anyToError(error),
        d: {
          commands: commands,
          botId: this.client.user?.id,
        },
      });
    }
  }

  private async loadGuildCommands(): Promise<void> {
    try {
      if (isDev) {
        const commands = commandMapToAPIArray(this.guildCommands.get(devConfig.guilds.section.id) ?? new Map<string, Command<Service>>());
        if (commands.length === 0) {
          return;
        }

        await this.client.rest.put(Routes.applicationGuildCommands(this.client.user?.id ?? "error", devConfig.guilds.section.id), {
          body: commands,
        });

        this.client.logger.info(`register ${commands.length} section commands (in dev) with success`);

      } else {
        for (const [guildId, commands] of this.guildCommands.entries()) {
          const commandsArray = commandMapToAPIArray(commands);
          if (commandsArray.length === 0) {
            continue;
          }

          await this.client.rest.put(Routes.applicationGuildCommands(this.client.user?.id ?? "error", guildId), {
            body: commandsArray,
          });

          this.client.logger.info(`register ${commandsArray.length} section commands for server ${guildId} with success`);
        }
      }
    } catch (error) {
      this.client.logger.fatal({
        m: "failed to load guild commands",
        e: anyToError(error),
        d: {
          botId: this.client.user?.id,
        },
      });
    }
  }

}