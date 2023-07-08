import {z} from 'zod';
import type {GuildMember, User} from '@prisma/client';
import {prisma} from '$core/handlers/database/prisma';
import {Collection} from 'discord.js';

const guildSchema = z.object({
	name: z.string(),
	icon: z.string().url(),
});

const rewardSchema = z.object({
	id: z.number(),
	level: z.number(),
	reward: z.string(),
});

const userSchema = z.object({
	id: z.string(),
	username: z.string(),
	displayName: z.string(),
	avatar: z.nullable(z.string()),
	hasGuildAvatar: z.boolean(),
	discriminator: z.string(),
	level: z.number(),
	currentLevelXp: z.string(),
	levelXp: z.string(),
	totalXp: z.string(),
});

const schema = z.object({
	guild: guildSchema,
	rewards: z.array(rewardSchema),
	totalUsersCount: z.number(),
	users: z.array(userSchema),
	member: z.unknown(),
	page: z.number()
});


const URL = (id: string, page: number) => `https://www.draftbot.fr/api/activities/levels/${id}?page=${page}`;

const guilds = [
	'840673242838859786',
	'524526538151034892',
	'780909897083781151',
	'580422922963779625',
	'795972160023822346',
	'805892482336423976',
	'346989473143455744',
	'783421034455105556',
	'891729840028409857'
];

const globalCount = 0;

const run = async () => {
	const usersData = new Collection<string, User>();
	const guildMembers: GuildMember[] = [];

	console.log('start script for get draftbot xp');

	for (const guildId of guilds) {

		let stats = 0;
		let hasMorePage = true;
		let i = 0;
		while (hasMorePage) {
			const response = await fetch(URL(guildId, i));
			if (!response.ok) {
				console.log(`current guildId: ${guildId}`);
				console.log(`current page: ${i}`);
				throw new Error(`invalid respoonse, status: ${response.status}, text: ${await response.json()}`);
			}

			const members = schema.parse(await response.json());
			if (members.users.length < 1) {
				hasMorePage = false;
				continue;
			}
			stats += members.users.length;

			for (const member of members.users) {
				const user: User = {
					username: member.username,
					displayName: member.username,
					id: member.id,
					avatar: member.avatar
				};
				usersData.set(member.id, user);

				const memberData: GuildMember = {
					userId: member.id,
					guildId: guildId,
					avatar: member.hasGuildAvatar ? member.avatar : null,
					displayName: member.displayName,
					xp: parseInt(member.totalXp, 10)
				};

				guildMembers.push(memberData);
			}
			i++;
		}

		console.log(`found ${stats} members for guild ${guildId}`);
	}

	console.log(`found in total ${usersData.size} users and ${guildMembers.length} members`);

	await prisma.user.createMany({
		data: usersData.map((v) => v)
	});
	await prisma.guildMember.createMany({
		data: guildMembers
	});
};

void run();