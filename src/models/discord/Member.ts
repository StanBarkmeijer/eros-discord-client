import { Structures, GuildMember, Guild } from "discord.js";
import ErosClient from "./ErosClient";
import * as MemberModel from "../../models/db/Member.model";

Structures.extend("GuildMember", (member: typeof GuildMember) => {
    class NewGuild extends member {

        public money: Number;

        constructor(client: ErosClient, data: object, guild: Guild) {
            super(client, data, guild);

            MemberModel.findOne({ guildID: this.id })
                .then((data: any) => {
                    this.money = data.money;
                });
        }

    }

    return NewGuild;
})