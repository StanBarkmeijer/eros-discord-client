import { Guild, Channel, Snowflake } from "discord.js";
import ErosClient from "./ErosClient";
import { Model, Document } from "mongoose";

const GuildModel: Model<Document> = require("../../models/db/Guild.model");

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
                }).catch((err: Error) => console.log(err));
            }

            this.prefix = data.prefix;
            this.logChannel = client.channels.cache.get(data.logChannel);
        });
    }

    public getPrefix(): string {
        GuildModel.findOne({
            guildID: this.id
        }).then((data: any) => this.prefix = data.prefix ?? "<" );

        return this.prefix;
    }

    public getLogChannel(): string {
        GuildModel.findOne({
            guildID: this.id
        }).then((data: any) => this.logChannel = this.channels.cache.get(data.logChannel));

        return this.logChannel.id;
    }

    public async setPrefix(prefix: string): Promise<string> {
        if (prefix.length > 5) return Promise.reject("Prefix is too long");
        else {
            GuildModel.findOneAndUpdate(
                { guildID: this.id }, 
                { prefix: prefix }, 
                { new: true , upsert: true}
            ).then((data: any) =>  this.prefix = data.prefix )
             .catch((err: Error) => Promise.reject(err));

            return Promise.resolve(`Old prefix: \`${this.getPrefix()}\`\nNew prefix: \`${prefix}\``);
        }
    }

    public async setLogchannel(channel: string): Promise<string> {
        GuildModel.findOneAndUpdate(
            { guildID: this.id },
            { logChannel: channel },
            { new: true, upsert: true }
        ).then((data: any) => this.logChannel = this.channels.cache.get(data.logChannel))
         .catch((err: Error) => Promise.reject(err));

        const oldLog = this.channels.cache.get(this.getLogChannel());
        const newLog = this.channels.cache.get(channel);

        if (oldLog.id === newLog.id) return Promise.reject(`You tried to set the new log channel to the same log channel as before.`);

        return Promise.resolve(`Old log channel: \`${oldLog.name}\`\nNew log channel: \`${newLog.name}\``);
    }

}

export = NewGuild;