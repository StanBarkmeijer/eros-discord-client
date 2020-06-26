import ErosClient from "../../models/discord/ErosClient";
import Command from "../../models/command/Command.class";
import { Message, MessageEmbed } from "discord.js";
import NewMember from "../../models/discord/Member";
import { getMemberFromMessage } from "../../config/utils";
import { succesGreen } from "../../colors";

class setbalance extends Command {

    constructor(client: ErosClient) {
        super(client, {
            name: 'setbalance', 
            aliases: ['setbal'], 
            description: 'Set the balance of the member\nIf no person was mentioned, set balance to yourself', 
            category: 'economy', 
            usage: 'setbalance [ID | MENTION]', 
            permissionLevel: 'MANAGE_GUILD'
        });
    }

    async run(message: Message, args: string[]) {
        if (!args[0]) {
            return this.client.warning(message.channel, "You did not provide an amount of money to set");
        }

        const toSet: number = +args[0];

        if (isNaN(toSet)) {
            return this.client.warning(message.channel, `\`${args[0]}\` is not a number. Please try again`);
        }

        if (toSet < 0) {
            return this.client.warning(message.channel, "You can't set the balance below **0**");
        }

        const member: NewMember = getMemberFromMessage(message) as NewMember;

        const embed: MessageEmbed = new MessageEmbed()
            .setColor(succesGreen)
            .setTimestamp()
            .setFooter(`Balance for ${member.displayName} set by ${message.member.displayName}`, message.author.displayAvatarURL())
    
        member
            .setBalance(toSet)
            .then((res: string) => message.channel.send(embed.setDescription(res)))
            .catch((res: string) => message.channel.send(this.client.error(message.channel, res)));
    }
}

export = setbalance;