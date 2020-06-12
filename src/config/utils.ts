import { Message, GuildMember } from "discord.js";

const utils = {
    getMemberFromMessage: (message: Message): GuildMember => {
        const args = message.content
            .slice("<".length)
            .trim()
            .split(/ +/g)
            .slice(1);

        let member: GuildMember;

        if (message.mentions.members.size > 0) {
            member = message.mentions.members.first();
        } else if (args[0]) {
            member = message.guild.members.cache.get(args[0]);
        }

        if (!member) {
            return message.member;
        }
    }
}

export = utils;