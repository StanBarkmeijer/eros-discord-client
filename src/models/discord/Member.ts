import { GuildMember, Guild } from "discord.js";
import ErosClient from "./ErosClient";

const MemberModel = require("../../models/db/Member.model");

export = (member: typeof GuildMember) => {
    class NewMember extends member {

        public money: Number;

        constructor(client: ErosClient, data: object, guild: Guild) {
            super(client, data, guild);

            this.getFromDatabase(guild);
        }

        private getFromDatabase(guild: Guild): void {
            MemberModel.findOne({ 
                userID: this.id, 
                guildID: guild.id 
            }).then((data: any) => {
                if (!data || !data.userID) {
                    return MemberModel.create({
                        userID: this.id,
                        guildID: guild.id
                    }).then((data: any) => this.money = data.balance)
                      .catch((err: any) => console.log(err));
                }

                this.money = data.balance;
            }).catch((err: any) => console.log(err));
        }

    }

    return NewMember;
};