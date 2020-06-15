import { Structures, Guild, Channel } from "discord.js";
import ErosClient from "./ErosClient";
import * as GuildModel from "../../models/db/Guild.model";

Structures.extend("Guild", (guild: typeof Guild) => {
    class NewGuild extends guild {

        public prefix: string;
        public logChannel: Channel;

        constructor(client: ErosClient, data: object) {
            super(client, data);

            GuildModel.findOne({ guildID: this.id })
                .then((data: any) => {
                    this.prefix = data.prefix;
                    this.logChannel = client.channels.cache.get(data.logChannel);
                });
        }

    }

    return NewGuild;
})