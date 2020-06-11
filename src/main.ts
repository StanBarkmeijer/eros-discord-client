import { config } from "dotenv";
import ErosClient from "./models/discord/ErosClient";
import logger from "./config/logger";

config({ path: "../.env"});

const client: ErosClient = new ErosClient(process.env.DISCORD_TOKEN);

client.once("ready", async () => {
	const inv: string = await client.generateInvite("ADMINISTRATOR");

	logger.info(`Name:   ${client.user.username}`);
	logger.info(`Guilds: ${client.guilds.cache.size}`)
	logger.info(`Invite: ${inv}`);
});