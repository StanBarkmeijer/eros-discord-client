import { config } from "dotenv";
import ErosClient from "./models/discord/ErosClient";
import logger from "./config/logger";

const client: ErosClient = new ErosClient(process.env.DISCORD_TOKEN);

client.once("ready", async () => {
	const inv: string = await client.generateInvite("ADMINISTRATOR");

	logger.info("Invite: " + inv);
});