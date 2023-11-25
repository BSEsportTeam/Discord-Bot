import { Task, TaskType } from "$core/handlers/task";

export class BrawlStarsStaff extends Task<null> {

  interval = "0 0 * * *";

  type = TaskType.CRON_INTERVAL;

  async onTick() {

  }

}