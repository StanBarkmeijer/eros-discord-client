import { Structures, Guild } from "discord.js";
import ErosClient from "./ErosClient";

Structures.extend("Guild", (guild: typeof Guild) => {
    class NewGuild extends Guild {

        constructor(client: ErosClient, data: object) {
            super(client, data);
        }

    }

    return NewGuild;
})