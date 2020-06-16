import { Structures, Guild, Channel } from "discord.js";
import ErosClient from "./ErosClient";

const GuildModel = require("../../models/db/Guild.model");

export = (guild: typeof Guild) => {
    class NewGuild extends guild {

        public prefix: string;
        public logChannel: Channel;

        constructor(client: ErosClient, data: object) {
            super(client, data);

            this.getFromDatabase(client);
        }

        private getFromDatabase(client: ErosClient): void {
            GuildModel.findOne({ 
                guildID: this.id 
            }).then((data: any) => {
                if (!data) {
                    return GuildModel.create({
                        guildID: this.id
                    }).then((data: any) => { 
                        this.prefix = data.prefix;
                        this.logChannel = client.channels.cache.get(data.logChannel);
                    }).catch((err: any) => console.log(err));
                }

                this.prefix = data.prefix;
                this.logChannel = client.channels.cache.get(data.logChannel);
            });
        }

    }

    return NewGuild;
};