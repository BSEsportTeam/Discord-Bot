import 'dotenv/config';
import {ApplicationCommandType, Client, IntentsBitField, InteractionType, SlashCommandBuilder} from 'discord.js';
import * as process from 'process';
import {Routes} from 'discord-api-types/v10';
import {devConfig} from '$core/config/guilds/_dev/dev.config';

const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers
	]
});

const baseCommand = () => new SlashCommandBuilder()
	.addBooleanOption(option => option.setName('pass').setDescription('ab'))
	.setDescription('ab');
const commands = [
	baseCommand().setName('bumpone').toJSON(),
	baseCommand().setName('bumptwo').toJSON(),
	baseCommand().setName('vote').toJSON()
];
client.on('ready', async () => {
	console.log('logged in');
	await client.rest.put(Routes.applicationGuildCommands(client.user?.id ?? '', devConfig.guilds.guildMain.guildId), {
		body: commands
	});
});
client.on('interactionCreate', async (interaction) => {

	if (interaction.type !== InteractionType.ApplicationCommand) {
		return;
	}

	if (interaction.commandType !== ApplicationCommandType.ChatInput) {
		return;
	}

	const pass = interaction.options.getBoolean('pass', false) ?? false;
	switch (interaction.commandName) {
	case 'bumpone':
		if (pass) {
			await interaction.reply({
				content: 'Bumped'
			});
		} else {
			await interaction.reply({
				content: 'not bumped',
				ephemeral: true
			});
		}
		break;
	case 'bumptwo':
		if (pass) {
			await interaction.reply({
				embeds: [
					{
						'url': 'https://discordtop.net/',
						'title': '🤙 `arcoz#0` VIENT DE VOTER !',
						'description': '```Nous avons le plaisir de vous confirmer la prise en compte de votre vote pour BS ESPORT TEAM !\n\n Vous pourrez voter à nouveau dans une heure, activez le rappel pour être notifié !```',
						'color': 6093417,
						'timestamp': '2023-09-14T20:46:36.358000+00:00',
						'thumbnail': {
							'url': 'https://cdn.discordapp.com/avatars/457144873859022858/a5b0b893e8821f7fa31b2194fad80079',
							'proxy_url': 'https://images-ext-1.discordapp.net/external/kQbX8xCFDhHmwngRJcDssETljGPIqCiIvxnTLloSOqo/https/cdn.discordapp.com/avatars/457144873859022858/a5b0b893e8821f7fa31b2194fad80079',
							'width': 128,
							'height': 128
						},
						'footer': {
							'text': '© DISCORDTOP 2023',
							'icon_url': 'https://cdn.discordapp.com/icons/1071463831638900836/44123db5050fb242c68093b968cb3584?size=64',
							'proxy_icon_url': 'https://images-ext-2.discordapp.net/external/SRhm98BKJ4nDe7O_upm4lfrMLUcKC-KG-9XcpZ1LFDE/%3Fsize%3D64/https/cdn.discordapp.com/icons/1071463831638900836/44123db5050fb242c68093b968cb3584'
						}
					}
				]
			});
		} else {
			await interaction.reply({
				embeds: [
					{
						'url': 'https://discordtop.net/',
						'title': '😭 `arcoz#0` A ESSAYÉ DE VOTER !',
						'description': '```\nIl se trouve que vous arrivez avec un peu d\'avance, vous avez voté il y a moins d\'une heure, un peu de patience ! Vous pourrez voter dans 60 minutes !\n```',
						'color': 16065058,
						'timestamp': '2023-09-14T20:46:57.592000+00:00',
						'thumbnail': {
							'url': 'https://cdn.discordapp.com/avatars/457144873859022858/a5b0b893e8821f7fa31b2194fad80079',
							'proxy_url': 'https://images-ext-1.discordapp.net/external/kQbX8xCFDhHmwngRJcDssETljGPIqCiIvxnTLloSOqo/https/cdn.discordapp.com/avatars/457144873859022858/a5b0b893e8821f7fa31b2194fad80079',
							'width': 128,
							'height': 128
						},
						'footer': {
							'text': '© DISCORDTOP 2023',
							'icon_url': 'https://cdn.discordapp.com/icons/1071463831638900836/44123db5050fb242c68093b968cb3584?size=64',
							'proxy_icon_url': 'https://images-ext-2.discordapp.net/external/SRhm98BKJ4nDe7O_upm4lfrMLUcKC-KG-9XcpZ1LFDE/%3Fsize%3D64/https/cdn.discordapp.com/icons/1071463831638900836/44123db5050fb242c68093b968cb3584'
						}
					}
				]
			});
		}
		break;
	case 'vote':
		if (pass) {
			await interaction.reply({
				embeds: [
					{
						'url': 'https://discordtop.net/',
						'title': '\ud83d\ude80 `cleva2#0 `VIENT DE BOOSTER LE SERVEUR !',
						'description': '```Le d\u00e9collage du serveur BS ESPORT TEAM est bien r\u00e9ussi !\n\nOn m\'informe qu\'un nouveau d\u00e9collage sera possible dans une heure !```',
						'color': 6093417,
						'timestamp': '2023-09-12T20:21:22.734000+00:00',
						'thumbnail': {
							'url': 'https://cdn.discordapp.com/avatars/793211840796426270/a684d6780df8687680d520f187d4e660',
							'proxy_url': 'https://images-ext-2.discordapp.net/external/uhF6MNZku6lWVVcBc6_8-yIOFbq0JK9NAifndiGQ6Mk/https/cdn.discordapp.com/avatars/793211840796426270/a684d6780df8687680d520f187d4e660',
							'width': 128,
							'height': 128
						},
						'footer': {
							'text': '\u00a9 DISCORDTOP 2023',
							'icon_url': 'https://cdn.discordapp.com/icons/1071463831638900836/44123db5050fb242c68093b968cb3584?size=64',
							'proxy_icon_url': 'https://images-ext-2.discordapp.net/external/SRhm98BKJ4nDe7O_upm4lfrMLUcKC-KG-9XcpZ1LFDE/%3Fsize%3D64/https/cdn.discordapp.com/icons/1071463831638900836/44123db5050fb242c68093b968cb3584'
						}
					}
				]
			});
		} else {
			await interaction.reply({
				embeds: [
					{
						'url': 'https://discordtop.net/',
						'title': '😭 `arcoz#0 `A ESSAYÉ DE BOOSTER LE SERVEUR !',
						'description': '```\nLe décollage du serveur BS ESPORT TEAM est actuellement impossible, la rampe n\'est pas prête !\n\nMais d\'après mes informations, un décollage sera possible dans 54 minutes !\n```',
						'color': 16065058,
						'timestamp': '2023-09-14T20:46:52.136000+00:00',
						'thumbnail': {
							'url': 'https://cdn.discordapp.com/avatars/457144873859022858/a5b0b893e8821f7fa31b2194fad80079',
							'proxy_url': 'https://images-ext-1.discordapp.net/external/kQbX8xCFDhHmwngRJcDssETljGPIqCiIvxnTLloSOqo/https/cdn.discordapp.com/avatars/457144873859022858/a5b0b893e8821f7fa31b2194fad80079',
							'width': 128,
							'height': 128
						},
						'footer': {
							'text': '© DISCORDTOP 2023',
							'icon_url': 'https://cdn.discordapp.com/icons/1071463831638900836/44123db5050fb242c68093b968cb3584?size=64',
							'proxy_icon_url': 'https://images-ext-2.discordapp.net/external/SRhm98BKJ4nDe7O_upm4lfrMLUcKC-KG-9XcpZ1LFDE/%3Fsize%3D64/https/cdn.discordapp.com/icons/1071463831638900836/44123db5050fb242c68093b968cb3584'
						}
					}
				]
			});
		}
		break;

	default:
		console.log('unknown commands', interaction.commandName);
	}
});
void client.login(process.env.FAKE_BUMP_TOKEN);