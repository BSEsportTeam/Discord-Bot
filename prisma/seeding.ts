import type {Guild, GuildMember, User} from '@prisma/client';
import {PrismaClient} from '@prisma/client';
import {faker} from '@faker-js/faker';

const guilds: Guild[] = [
	{
		name: 'server1',
		id: '1'
	},
	{
		name: 'server2',
		id: '2'
	},
	{
		name: 'server3',
		id: '3'
	},
	{
		name: 'server4',
		id: '4'
	},
	{
		name: 'server5',
		id: '5'
	},
];

const getRandom = (max: number) => {
	return Math.floor(Math.random() * max) + 1;
};

const getProba = (proba: number) => {
	return 1 === getRandom(proba);
};

const generateRandomArray = (): number[] => {
	const arrayLength = Math.floor(Math.random() * 5) + 1;
	const availableNumbers = [1, 2, 3, 4, 5];
	const result: number[] = [];

	for (let i = 0; i < arrayLength; i++) {
		const randomIndex = Math.floor(Math.random() * availableNumbers.length);
		const randomNumber = availableNumbers.splice(randomIndex, 1)[0];
		result.push(randomNumber);
	}

	return result;
};

const getUsers = (count: number): User[] => {
	const users: User[] = [];
	while (users.length < count) {
		const username = faker.internet.userName();
		users.push({
			username: username,
			displayName: getProba(20) ? faker.internet.displayName() : username,
			id: faker.string.uuid(),
			avatar: null
		});
	}
	return users;
};

const getGuildMembers = (users: User[]): GuildMember[] => {
	const guildMembers: GuildMember[] = [];
	
	for (let i = 0; i < users.length; i++) {
		const guildsId = generateRandomArray();
		for (let i2 = 0; i2 < guildsId.length; i2++) {
			guildMembers.push({
				userId: users[i].id,
				guildId: String(guildsId[i2]),
				xp: getRandom(1000000),
				displayName: getProba(20) ? faker.internet.displayName() : null,
				avatar: null
			});
		}
	}
	return guildMembers;
};

function wait(milliseconds: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, milliseconds);
	});
}

const prisma = new PrismaClient();

void prisma.$transaction(async(tx) => {
	await tx.guild.deleteMany();
	await tx.guildMember.deleteMany();
	await tx.user.deleteMany();

	const users = getUsers(30000);
	console.log(`generated  ${users.length} users`);
	await wait(5000);
	const members = getGuildMembers(users);
	await wait(10000);
	console.log(`generated ${members.length} members`);

	await tx.user.createMany({
		data: users
	});

	await tx.guild.createMany({
		data: guilds
	});

	await tx.guildMember.createMany({
		data: members
	});


},  { timeout: 100_000 }).then(() => prisma.$disconnect());