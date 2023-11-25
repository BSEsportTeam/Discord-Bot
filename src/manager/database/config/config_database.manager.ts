import type { DatabaseManager } from "$core/manager/database/database.manager";
import type { ServiceConfig } from "$core/manager/database/config/config_database.type";

export class ConfigDatabaseManager {

  public configs: ServiceConfig[] = [];

  constructor(private readonly databaseManager: DatabaseManager) {
  }

  async load(): Promise<void> {
    try {
      this.configs = (await this.databaseManager.db.config.findMany()).map(config => {
        return {
          name: config.service,
          value: config.value,
        };
      });
    } catch (error) {

    }
  }

}