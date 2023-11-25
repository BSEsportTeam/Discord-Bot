import { Task, TaskType } from "$core/handlers/task";
import { getAllValuesForPubMessage } from "$core/tasks/update_db_values/values/message_since_last_pub.util";
import { addMessagesSinceLastPub } from "$core/handlers/database/guild/guild.func";
import { logger } from "$core/utils/logger";
import { Dev } from "$core/utils/dev";

@Dev
export default class UpdateDbValue extends Task<null> {

  type = TaskType.DELAY_INTERVAL;

  interval = 5 * 60 * 1000;

  onTick() {
    // messages since last send
    const lastMessages = getAllValuesForPubMessage();

    lastMessages.forEach(async(count, id) => {
      const result = await addMessagesSinceLastPub(id, count);
      if (!result.ok) {
        logger.error(`failed to put messages since last pub count, error ${result.error.message}`);
        logger.debugValues(result.error.debug());
      }
    });
  }

}