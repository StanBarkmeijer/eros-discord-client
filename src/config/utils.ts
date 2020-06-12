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
        }

        if (args[0]) {
            message.guild.members
                .fetch(args[0])
                .then((m: GuildMember) => member = m);
        }

        if (!member) {
            return message.member;
        }
    }
}

export = utils;