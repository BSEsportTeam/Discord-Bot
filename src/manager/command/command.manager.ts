import type { Client } from "$core/client";
import type { Command } from "$core/base/command/";
import type { Service } from "$core/base/service";
import { anyToError } from "$core/utils/error";
import { commandMapToAPIArray } from "$core/manager/command/command.util";
import { isDev } from "$core/config/env";
import { devConfig } from "$core/config/dev/dev.config";
import type { ApplicationCommand } from "discord.js";

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
        const manager = this.client.guilds.cache.get(devConfig.guilds.all.id)?.commands;
        if (!manager) {
          this.client.logger.fatal({
            m: "failed to load global commands",
            e: new Error("manager not found"),
            d: {
              commands: commands,
              botId: this.client.user?.id,
            },
          });
          return;
        }
        const applicationCommands = await manager.set(commands);
        this.setIds(applicationCommands.map(cmd => cmd));

      } else {

        const manager = this.client.application?.commands;
        if (!manager) {
          this.client.logger.fatal({
            m: "failed to load global commands",
            e: new Error("manager not found"),
            d: {
              commands: commands,
              botId: this.client.user?.id,
            },
          });
          return;
        }

        const applicationCommands = await manager.set(commands);
        this.setIds(applicationCommands.map(cmd => cmd));


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
        const manager = this.client.guilds.cache.get(devConfig.guilds.section.id)?.commands;
        if (!manager) {
          this.client.logger.fatal({
            m: "failed to load guild commands",
            e: new Error("manager not found"),
            d: {
              commands: commands,
              botId: this.client.user?.id,
            },
          });
          return;
        }

        const applicationCommands = await manager.set(commands);
        this.setIds(applicationCommands.map(cmd => cmd));

        this.client.logger.info(`register ${commands.length} section commands (in dev) with success`);

      } else {
        for (const [guildId, commands] of this.guildCommands.entries()) {
          const commandsArray = commandMapToAPIArray(commands);
          if (commandsArray.length === 0) {
            continue;
          }

          const manager = this.client.guilds.cache.get(guildId)?.commands;
          if (!manager) {
            this.client.logger.error({
              m: "failed to load guild commands",
              e: new Error("manager not found"),
              d: {
                commands: commandsArray,
                botId: this.client.user?.id,
              },
            });
            continue;
          }

          const applicationCommands = await manager.set(commandsArray);
          this.setIds(applicationCommands.map(cmd => cmd));

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


  private setIds(commands: ApplicationCommand[]): void {
    for (const command of commands) {
      const commandRun = this.commandsRun.get(command.name);
      if (!commandRun) {
        continue;
      }
      commandRun.id = command.id;
    }
  }

}