import { GuildMember, Guild } from "discord.js";
import ErosClient from "./ErosClient";
import { Document, Model } from "mongoose";

const MemberModel: Model<Document> = require("../../models/db/Member.model");

class NewMember extends GuildMember {

    public money: number;

    constructor(client: ErosClient, data: object, guild: Guild) {
        super(client, data, guild);

        this.getFromDatabase();
    }

    private getFromDatabase(): void {
        MemberModel.findOne({ 
            userID: this.id, 
            guildID: this.guild.id 
        }).then((data: any) => {
            if (!data || !data.userID) {
                return MemberModel.create({
                    userID: this.id,
                    guildID: this.guild.id
                }).then((data: any) => this.money = data.balance)
                  .catch((err: Error) => console.log(err));
            }

            this.money = data.balance;
        }).catch((err: Error) => console.log(err));
    }

    public getMoney(): number {
        MemberModel.findOne({
            userID: this.id,
            guildID: this.guild.id
        }).then((data: any) => {
            this.money = data && data.balance ? data.balance : 0; 
        }).catch((err: Error) => console.log(err));
        
        return this.money;
    }

    public async setBalance(newMoney: number): Promise<string> {
        MemberModel.findOneAndUpdate(
            { userID: this.id, guildID: this.guild.id },
            { balance: newMoney },
            { new: true, upsert: true }
        ).then((data: any) => this.money = data.balance)
         .catch((err: Error) => Promise.reject(err));

        return Promise.resolve(`Old balance: \`${this.getMoney()}\`\nNew balance set to: \`${newMoney}\``)
    }

}

export = NewMember;