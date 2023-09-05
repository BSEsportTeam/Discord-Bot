import {Task, TaskType} from '$core/handlers/task';
import {getVoices} from '$core/utils/xp/voice/voice.util';
import {Collection} from 'discord.js';
import type {VoiceInfos} from '$core/utils/xp/voice/voice.type';
import {isDev} from '$core/config/env';
import {getDevGuildWithId, getGuildWithId} from '$core/config/guilds';
import type {Snowflake} from 'discord-api-types/globals';
import {addVoiceXp} from '$core/tasks/voice_xp/voice_xp.util';
import {Dev} from '$core/utils/dev';

@Dev
export default class VoiceXp extends Task<null> {
	type = TaskType.DELAY_INTERVAL;
	interval = 60 * 1000 * 3;

	async onTick() {
		const voices = getVoices();
		const channelVoices = new Collection<Snowflake, VoiceInfos[]>();

		// filter per guild
		for (const voiceInfo of voices) {
			if (voiceInfo.deaf) {
				continue;
			}

			const guild = isDev ? getDevGuildWithId(voiceInfo.guildId) : getGuildWithId(voiceInfo.guildId);
			if (!guild) {
				continue;
			}

			if (!guild.xp.enable) {
				continue;
			}

			const guildVoices = channelVoices.get(voiceInfo.channelId) || [];
			guildVoices.push(voiceInfo);
			channelVoices.set(voiceInfo.channelId, guildVoices);
		}

		for (const voicesInfos of channelVoices.filter(v => v.length > 1 || isDev).values()) {
			for (const voiceInfo of voicesInfos) {
				void addVoiceXp(Date.now(), voiceInfo);
			}
		}
	}
}