import {Client} from '$core/client';
import {isDev} from '$core/utils/environements';
import {config as dotenvConfig} from 'dotenv';
import * as process from 'process';
import {logger} from '$core/utils/logger/logger.func';
import {version} from '../package.json';

dotenvConfig();

export const mainDir = () => __dirname;
export const client = new Client(process.env.TOKEN!);
logger.info(`starting BSE Bot v${version}...`);
if (isDev) logger.info('dev mode enable');
void client.login();