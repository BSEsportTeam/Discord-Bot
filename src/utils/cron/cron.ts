import type {CronCommand} from 'cron';
import {CronJob} from 'cron';


export const startCronJob = (interval: string, execute: CronCommand) => {
	const job = new CronJob({
		cronTime: interval,
		onTick: execute,
		timeZone: 'Europe/Paris'
	});

	job.start();
};