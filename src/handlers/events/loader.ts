import type {Client} from '$core/client';
import {ready} from '$core/handlers/events/ready';
import {interaction} from '$core/handlers/events/interaction';


export const loadEvents = (client: Client) => {
	client.on('ready', () => {
		ready(client).catch(e => {
			throw e;
		});
	});

	client.on('interactionCreate', (inter) => {
		interaction(client, inter).catch(e => {
			console.error(e);
		});
	});
};