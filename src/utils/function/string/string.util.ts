// code from https://github.com/Virtual-Royaume/Royaume-Discord-Bot/blob/main/$core/utils/message/message.util.ts
import { TextManager } from "$core/manager/database/text/text.manager";

export const msgParams = (message: string, params: (string | number)[]): string => {
  const words = message.match(/{[^}]+}/g);

  if (words) for (let i = 0; i < params.length; i++) {
    message = message.replace(words[i], String(params[i]));
  }

  return message;
};

export const getMessage = (id: string, params: (string | number)[] = []): string => {
  return msgParams(TextManager.get(id), params);
};