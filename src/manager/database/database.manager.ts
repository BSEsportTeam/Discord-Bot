import type { Client } from "$core/client";
import { PrismaClient } from "@prisma/client";
import { ConfigDatabaseManager } from "$core/manager/database/config/config_database.manager";
import { TextManager } from "$core/manager/database/text/text.manager";
import { anyToError } from "$core/utils/error";

export class DatabaseManager {

  readonly db: PrismaClient;

  readonly config: ConfigDatabaseManager;

  readonly text: TextManager;

  constructor(public readonly client: Client) {
    this.db = new PrismaClient();
    this.config = new ConfigDatabaseManager(this);
    this.text = new TextManager(this);
  }

  async load(): Promise<void> {
    await this.connect();

    await this.config.load();
    await this.text.load();
  }

  async connect(): Promise<void> {
    try {
      await this.db.$connect();
      this.client.logger.info("connected to database");
    } catch (error) {
      this.client.logger.fatal({
        m: "failed to connect to database",
        e: anyToError(error),
      });
    }
  }

}