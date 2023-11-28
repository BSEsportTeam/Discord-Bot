export enum TaskType {
  CRON_INTERVAL,
  DELAY_INTERVAL,
  MULTIPLE_CRON_INTERVAL
}

export type MultipleCronInterval<T> = {
  interval: string;
  options?: T;
}

export type TaskInterval = string | number;