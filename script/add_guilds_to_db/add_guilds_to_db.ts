import {prisma} from '$core/manager/database/prisma';
import type {Guild} from '@prisma/client';
import {guildsConfig} from '$core/config/guilds';

const data: Pick<Guild, 'name' | 'id'>[] = [];
for (const guild of Object.values(guildsConfig)) {
	data.push({
		name: guild.name,
		id: guild.guildId
	});
}

prisma.guild.createMany({
	data: data
})
	.then(() => console.log(`add ${data.length} guilds in db`))
	.catch((e) => {
		throw e;
	});