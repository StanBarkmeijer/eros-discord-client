import ErosClient from "../models/discord/ErosClient";
import logger from "../config/logger";

let firstStart: boolean = true;

export = async (client: ErosClient) => {
    if (firstStart) {
        firstStart = false;

        const inv: string = await client.generateInvite("ADMINISTRATOR");

        logger.info(`Name:   ${client.user.username}`);
        logger.info(`Guilds: ${client.guilds.cache.size}`)
        logger.info(`Invite: ${inv}`);

        client.user.setPresence({
            activity: {
                name: "with your heart 💘",
                type: "PLAYING"
            },
            status: "online"
        });
    }
}