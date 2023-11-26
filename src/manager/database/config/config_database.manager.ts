import type { DatabaseManager } from "$core/manager/database/database.manager";
import { anyToError } from "$core/utils/error";

export class ConfigDatabaseManager {

  public configs: Map<string, string> = new Map();

  constructor(private readonly databaseManager: DatabaseManager) {
  }

  async load(): Promise<void> {
    try {
      this.configs = new Map((await this.databaseManager.db.config.findMany()).map(config => [config.service, config.value]));
      this.databaseManager.client.logger.info(`loaded with success ${this.configs.size} configs`);
    } catch (error) {
      this.databaseManager.client.logger.fatal({
        m: "failed to load configs",
        e: anyToError(error),
      });
    }
  }

  get(name: string): string|null {
    return this.configs.get(name) || null;
  }

  async reloadConfig(name: string): Promise<boolean> {
    try {
      const config = await this.databaseManager.db.config.findUnique({ where: { service: name } });

      if (!config) return false;
      this.configs.set(name, config.value);

      this.databaseManager.client.logger.info(`reloaded with success config ${name}`);
      return true;
    } catch (error) {
      this.databaseManager.client.logger.error({
        m: "failed to reload config",
        e: anyToError(error),
      });
      return false;
    }
  }

}