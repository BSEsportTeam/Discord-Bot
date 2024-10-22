import type { Client } from "$core/client";
import { serviceHasLoad, serviceHasUnload } from "$core/base/service/service.util";
import { logger } from "$core/utils/logger";
import { anyToError } from "$core/utils/error";
import type { CommandList } from "$core/base/service/service.type";
import type { z } from "zod";
import { Logger } from "$core/utils/logger_new/logger.class";
import type { Button } from "$core/base/button/button.class";

export abstract class Service<C extends z.Schema = z.Schema> {

  client: Client;

  abstract name: string;

  reloadable = true;

  loadCount = 0;

  commands: CommandList<typeof this> = new Map();

  buttons: Map<string, Button<typeof this>> = new Map();

  schema: C | null = null;

  private logger?: Logger;

  protected constructor(client: Client) {
    this.client = client;
  }

  get log(): Logger {
    if (!this.logger) {
      this.logger = new Logger(this.name);
    }
    return this.logger;

  }

  protected async reload(): Promise<boolean> {
    if (!this.reloadable) {
      return false;
    }

    const configReload = await this.client.database.config.reloadConfig(this.name);
    if (!configReload) {
      return false;
    }

    await this.preUnload();
    return this.preLoad();
  }

  protected async preLoad(): Promise<boolean> {
    this.client.logger.info(`loading ${this.name}.`);
    if (serviceHasLoad(this)) {
      try {
        await this.load();
      } catch (e) {
        logger.error(`failed to load service ${this.name}.`);
        logger.debugValues({
          error: anyToError(e).message,
        });
        return false;
      }
    }

    if (this.loadCount === 0) {
      for (const command of this.commands.values()) {
        this.client.commandManager.addCommand(command);
      }

      for (const button of this.buttons.values()) {
        this.client.buttonManager.add(button);
      }
    }

    this.client.logger.info(`loaded ${this.name}.`);
    this.loadCount++;
    return true;
  }

  protected async preUnload(): Promise<void> {
    this.client.logger.info(`unloading ${this.name}.`);
    if (serviceHasUnload(this)) {
      try {
        await this.unload();
      } catch (e) {
        logger.error(`failed to unload service ${this.name}.`);
        logger.debugValues({
          error: anyToError(e).message,
        });
        return;
      }
    }
    this.client.logger.info(`unloaded ${this.name}.`);
  }

}