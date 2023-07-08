import type {BaseGuild, BrawlStarsGuild} from '$core/config/guilds';
import {guildsConfig} from '$core/config/guilds';
import {Client} from 'discord.js';
import {env} from '$core/config/env';
import {blue, green, magenta, red, underline, yellow} from 'colorette';

// Custom color constants
const errorColor = red;
const successColor = (text: string | number) => underline(green(text));
const warningColor = yellow;
const infoColor = (text: string | number) => underline(blue(text));
const variableColor = magenta;

const date = Date.now();
console.log(successColor('STARTING config checker...'));


const client = new Client({
	intents: 'Guilds'
});


const check = async (config: BaseGuild | BrawlStarsGuild) => {
	console.log(successColor(`prepare check for server ${config.name}`));

	const guild = client.guilds.cache.get(config.guildId);
	if (!guild) {
		throw new Error(errorColor(`Invalid guild id: ${variableColor(config.guildId)}`));
	}

	console.log(infoColor(`Start check ids for guild ${variableColor(guild.name)}\n\n`));

	const getRoleName = (id: string) => {
		return guild.roles.cache.get(id)?.name || null;
	};

	const getChannelName = (id: string) => {
		return guild.channels.cache.get(id)?.name || null;
	};

	const logResultChannel = (name: string, id: string) => {
		const channelName = getChannelName(id);
		if (!channelName) {
			console.error(errorColor(`Get null channel for channel ${variableColor(name)} (${warningColor(id)})`));
		} else {
			console.log(blue(`Channel config name: ${variableColor(name)} (${warningColor(id)}), channel real name: ${variableColor(channelName)}`));
		}
	};

	const logResultRole = (name: string, id: string) => {
		const roleName = getRoleName(id);
		if (!roleName) {
			console.error(errorColor(`Get null role for role ${variableColor(name)} (${warningColor(id)})`));
		} else {
			console.log(blue(`Role config name: ${variableColor(name)} (${warningColor(id)}), role real name: ${variableColor(roleName)}`));
		}
	};

	console.log(infoColor('Check Announcement config:\n'));
	logResultChannel('annonce event', config.eventAnnouncements.channelId);
	logResultRole('notif event', config.eventAnnouncements.roleId);

	console.log(infoColor('\nCheck Xp ids:\n'));
	logResultRole('xp boost', config.xp.xpBoostRole);
	logResultRole('booster', config.xp.boosterRole);
	for (const key in config.xp.levelUpRoles) {
		logResultRole(config.xp.levelUpRoles[key].name, config.xp.levelUpRoles[key].id);
	}
	logResultChannel('level up channel', config.xp.levelUpChannel);
	for (const channel of config.xp.disablesChannels) {
		logResultChannel('no xp channel', channel);
	}

	console.log(infoColor('\nCheck other ids:\n'));

	logResultChannel('chat general', config.pubMessages.channelId);
	logResultChannel('salons de bumps', config.bumpChannel);

	if ('autoPing' in config && config.name === 'brawlStars') {
		console.log(infoColor('\ncheck autoping roles for brawl stars :\n'));
		for (const key in config.autoPing.roles) {
			logResultRole(key, config.autoPing.roles[key]);
		}
		logResultChannel('club announce', config.autoPing.channel);
	}

};
client.on('ready', async () => {
	for (const guild of Object.values(guildsConfig)) {
		await check(guild);
	}
	console.log(successColor(`\nENDED in ${Math.floor(Date.now() - date)} ms`));
	client.destroy();
});

void client.login(env.TOKEN);