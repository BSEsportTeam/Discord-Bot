import { Client } from "$core/client";
import { env, isDev } from "$core/config/env";
import { logger } from "$core/utils/logger/logger.func";
import { version } from "../package.json";
import * as process from "process";

export const mainDir = () => __dirname;

export const client = new Client(env.TOKEN);

if ((!process.argv.includes("script"))) {
  logger.info(`starting BSE Bot v${version}...`);

  if (isDev) logger.info("dev mode enable");
  void client.login();
}