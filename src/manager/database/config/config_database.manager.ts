import type { DatabaseManager } from "$core/manager/database/database.manager";
import { anyToError } from "$core/utils/error";

export class ConfigDatabaseManager {

  public configs: Map<string, string> = new Map();

  constructor(private readonly databaseManager: DatabaseManager) {
  }

  async load(): Promise<void> {
    try {
      this.configs = new Map((await this.databaseManager.db.config.findMany()).map(config => [config.service, config.value]));
    } catch (error) {
      this.databaseManager.client.logger.fatal({
        m: "failed to load configs",
        e: anyToError(error),
      });
    }
  }

}