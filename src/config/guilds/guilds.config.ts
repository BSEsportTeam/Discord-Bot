import type {Guilds} from './guild.type';
import {globalGuildConfig} from './guilds_configs/global/base.config';
import {brawlStarsGuildConfig} from './guilds_configs/brawl_stars/base.config';
import {apexLegendsGuildConfig} from '$core/config/guilds/guilds_configs/apex_legends/base.config';
import {callOfDutyGuildConfig} from '$core/config/guilds/guilds_configs/call_of_duty/base.config';
import {clashOfClansGuildConfig} from '$core/config/guilds/guilds_configs/clash_of_clans/base.config';
import {clashRoyaleGuildConfig} from '$core/config/guilds/guilds_configs/clash_royale/base.config';
import {fortniteGuildConfig} from '$core/config/guilds/guilds_configs/fortnite/base.config';
import {rocketLeagueGuildConfig} from '$core/config/guilds/guilds_configs/rocket_league/base.config';
import {trackmaniaGuildConfig} from '$core/config/guilds/guilds_configs/trackmania/base.config';

export const guildsConfig = {
	apexLegends: apexLegendsGuildConfig,
	brawlStars: brawlStarsGuildConfig,
	callOfDuty: callOfDutyGuildConfig,
	clashOfClans: clashOfClansGuildConfig,
	clashRoyale: clashRoyaleGuildConfig,
	fortnite: fortniteGuildConfig,
	global: globalGuildConfig,
	rocketLeague: rocketLeagueGuildConfig,
	trackmania: trackmaniaGuildConfig,
} satisfies Guilds;