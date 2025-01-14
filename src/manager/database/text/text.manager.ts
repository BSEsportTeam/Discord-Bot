import type { DatabaseManager } from "$core/manager/database/database.manager";
import { anyToError } from "$core/utils/error";

export class TextManager {

  private texts: Map<string, string> = new Map();

  static instance: TextManager;

  constructor(private readonly databaseManager: DatabaseManager) {
    TextManager.instance = this;
  }

  async load(): Promise<void> {
    try {
      const texts = await this.databaseManager.db.text.findMany();
      this.texts = new Map(texts.map(text => [text.id, text.value]));

      this.databaseManager.client.logger.info(`loaded with success ${texts.length} texts`);
    } catch (error) {
      this.databaseManager.client.logger.fatal({
        m: "failed to load texts",
        e: anyToError(error),
      });
    }
  }

  static get(id: string): string {
    return this.instance?.texts?.get(id) || "no text found with id " + id;
  }

  async reload(): Promise<boolean> {
    try {
      const texts = await this.databaseManager.db.text.findMany();
      this.texts = new Map(texts.map(text => [text.id, text.value]));

      this.databaseManager.client.logger.info("reloaded with success texts");
      return true;
    } catch (error) {
      this.databaseManager.client.logger.error({
        m: "failed to reload texts",
        e: anyToError(error),
      });

      return false;
    }
  }

}