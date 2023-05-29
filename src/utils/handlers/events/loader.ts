import type {Client} from '$core/Client';
import {ready} from '$core/utils/handlers/events/ready';
import {interaction} from '$core/utils/handlers/events/interaction';


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