import type { VoiceInfos } from "$core/utils/xp/voice/voice.type";
import { addXp, XP_PER_MINUTE_MUTE, XP_PER_MINUTE_UNMUTE } from "$core/utils/xp";
import { logger } from "$core/utils/logger";
import { isDebuggableError } from "$core/utils/error";
import { setVoice } from "$core/utils/xp/voice/voice.util";

const calculateXp = (oldDate: number, newDate: number, mute: boolean): number => {
  const seconds = Math.floor(newDate / 1000) - Math.floor(oldDate / 1000);

  const xpPerMinute = mute ? XP_PER_MINUTE_MUTE : XP_PER_MINUTE_UNMUTE;

  return Math.floor((xpPerMinute / (60 * 3)) * seconds);
};

export const addVoiceXp = async (date: number, info: VoiceInfos) => {
  const result = await addXp(info.id, info.guildId, calculateXp(
    info.lastXpGive || info.start, date, info.mute
  ));

  if (!result.ok) {
    logger.error(`failed to give xp, error : ${result.error.message}`);
    if (isDebuggableError(result.error)) {
      logger.debugValues(result.error.debug());
    }
    return;
  }

  info.lastXpGive = date;
  setVoice(info);
};