import { Event } from "$core/handlers/events";
import { Dev } from "$core/utils/dev";
import type { VoiceState } from "discord.js";
import { ChannelType } from "discord.js";
import { getVoice, removeVoice, setVoice } from "$core/utils/xp/voice/voice.util";

@Dev
export default class VoiceStateUpdate extends Event<"voiceStateUpdate"> {

  name = "voiceStateUpdate" as const;

  async run(oldState: VoiceState, newState: VoiceState) {
    const member = oldState.member ?? newState.member;
    if (member === null) {
      return;
    }

    const guild = oldState.guild;

    if (newState.channel && newState.channel.type === ChannelType.GuildStageVoice) {
      removeVoice(guild.id, member.user.id);
      return;
    }
    //if join a channel :
    if (oldState.channel === null && newState.channel !== null) {
      setVoice({
        start: Date.now(),
        guildId: guild.id,
        id: member.user.id,
        deaf: newState.deaf || false,
        mute: newState.mute || false,
        lastUpdate: Date.now(),
        channelId: newState.channel.id,

      });
      return;
    }
    // if move to a channel :
    else if (oldState.channel !== null && newState.channel !== null) {
      const start = getVoice(guild.id, member.id)?.start || Date.now();
      setVoice({
        start: start,
        guildId: guild.id,
        id: member.user.id,
        deaf: newState.deaf || false,
        mute: newState.mute || false,
        lastUpdate: Date.now(),
        channelId: newState.channel.id,
      });
    }
    // if leave a channel :
    else if (oldState.channel !== null && newState.channel === null) {
      removeVoice(guild.id, member.user.id);
    }

    if ((oldState.mute !== newState.mute || oldState.deaf !== newState.mute) && newState.channel !== null) {
      const info = getVoice(guild.id, member.user.id);
      if (!info) {
        return;
      }

      info.mute = newState.mute || false;
      info.deaf = newState.deaf || false;

      setVoice(info);
    }
  }

}