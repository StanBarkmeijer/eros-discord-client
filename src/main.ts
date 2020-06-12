import { config } from "dotenv";
import ErosClient from "./models/discord/ErosClient";

config({ path: "../.env"});

const client: ErosClient = new ErosClient(process.env.DISCORD_TOKEN);