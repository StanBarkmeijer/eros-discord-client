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
                  .catch((err: any) => console.log(err));
            }

            this.money = data.balance;
        }).catch((err: any) => console.log(err));
    }

    public getMoney(): number {
        MemberModel.findOne({
            userID: this.id,
            guildID: this.guild.id
        }).then((data: any) => {
            this.money = data.balance ?? 0; 
        }).catch((err: any) => console.log(err));
        
        return this.money;
    }

    public updateMember(newMoney: number) {
        MemberModel.findOneAndUpdate({
            userID: this.id,
            guildID: this.guild.id
        }, { balance: newMoney },
        { new: true, upsert: true })
            .then((data: any) => {
                this.money = data.balance
            }).catch((err: any) => console.log(err));
    }

}

export = NewMember;