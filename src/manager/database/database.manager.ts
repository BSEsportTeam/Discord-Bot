import type { Client } from "$core/client";
import { PrismaClient } from "@prisma/client";
import { ConfigDatabaseManager } from "$core/manager/database/config/config_database.manager";

export class DatabaseManager {

  public readonly db: PrismaClient;

  public readonly config: ConfigDatabaseManager;

  constructor(public readonly client: Client) {
    this.db = new PrismaClient();
    this.config = new ConfigDatabaseManager(this);
  }

  async load(): Promise<void> {
    await this.connect();
    await this.config.load();
  }

  async connect(): Promise<void> {
    try {
      await this.db.$connect();
    } catch (error) {
      console.error(error);
    }
  }

}