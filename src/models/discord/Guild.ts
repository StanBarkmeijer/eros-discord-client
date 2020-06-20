import { Guild, Channel } from "discord.js";
import ErosClient from "./ErosClient";

const GuildModel = require("../../models/db/Guild.model");

class NewGuild extends Guild {

    public prefix: string;
    public logChannel: Channel | null;

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

    public getPrefix(): string {
        GuildModel.findOne({
            guildID: this.id
        }).then((data: any) => {
            this.prefix = data.prefix ?? "<";
        });

        return this.prefix;
    }

}

export = NewGuild;