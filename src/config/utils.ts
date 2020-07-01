import { Message, GuildMember } from "discord.js";

const utils = {
    getMemberFromMessage: (message: Message, index: number = 0): GuildMember => {
        const args = message.content
            .slice("<".length)
            .trim()
            .split(/ +/g)
            .slice(1);

        let member: GuildMember;

        if (message.mentions.members.size > 0) {
            member = message.mentions.members.first();
        } else if (args[index]) {
            member = message.guild.members.cache.get(args[index]);
        }

        return member ?? message.member;
    }
}

export = utils;