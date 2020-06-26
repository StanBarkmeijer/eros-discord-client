import ErosClient from "../../models/discord/ErosClient";
import Command from "../../models/command/Command.class";
import { Message, MessageEmbed } from "discord.js";
import NewMember from "../../models/discord/Member";
import { getMemberFromMessage } from "../../config/utils";
import { erosRed } from "../../colors";

class balance extends Command {

    constructor(client: ErosClient) {
        super(client, {
            name: "balance", 
            aliases: ["bal", "money"], 
            description: 'Returns your balance',
            category: "economy"
        });
    }

    async run(message: Message, args: string[]) {
        const member: NewMember = getMemberFromMessage(message, 0) as NewMember;

        const embed: MessageEmbed = new MessageEmbed()
            .setColor(erosRed)
            .setAuthor(member.displayName, member.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`Balance: ${member.getMoney()} 💸`);

        message.channel.send(embed)
    }
}

export = balance