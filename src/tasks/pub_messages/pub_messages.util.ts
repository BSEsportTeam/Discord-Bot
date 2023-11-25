import {DayJS} from "$core/utils/function/dayjs";
import {
  MIN_MESSAGES_ONE_DAY,
  MIN_MESSAGES_SAME_DAY,
  MIN_MESSAGES_THREE_DAYS,
  MIN_MESSAGES_TWO_DAYS
} from "$core/tasks/pub_messages/pub_messages.const";
import type {PubMessageConfig} from "$core/config/guilds";

export const getMinMessages = (lastSend: Date): number => {
  if (DayJS().diff(DayJS(lastSend), "day") === 0) {
    return MIN_MESSAGES_SAME_DAY;
  }
  if (DayJS().diff(DayJS(lastSend), "day") === 1) {
    return MIN_MESSAGES_ONE_DAY;
  }
  if (DayJS().diff(DayJS(lastSend), "day") === 2) {
    return MIN_MESSAGES_TWO_DAYS;
  }

  return MIN_MESSAGES_THREE_DAYS;
};

export const isToday = (lastSend: Date): boolean => DayJS(lastSend).isSame(DayJS(), "day");

export const getRandomMessage = (messages: PubMessageConfig[]): PubMessageConfig => {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};