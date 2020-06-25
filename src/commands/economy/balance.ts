import ErosClient from "../../models/discord/ErosClient";
import Command from "../../models/command/Command.class";
import { Message, MessageEmbed } from "discord.js";
import NewMember from "../../models/discord/Member";

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
        const member: NewMember = message.member as NewMember;

        const embed: MessageEmbed = new MessageEmbed()
            .setColor("RED")
            .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Balance: ${member.getMoney()} 💸`);

        message.channel.send(embed)
    }
}

export = balance