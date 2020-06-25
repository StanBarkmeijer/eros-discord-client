import ErosClient from "../../models/discord/ErosClient";
import Command from "../../models/command/Command.class";
import { Message, MessageEmbed } from "discord.js";
import NewGuild from "../../models/discord/Guild";
import { succesGreen } from "../../colors";

class prefix extends Command {

    constructor(client: ErosClient) {
        super(client, {
            name: 'prefix', 
            aliases: ['setprefix'], 
            description: 'Sets the server prefix', 
            category: 'config', 
            usage: 'prefix <PREFIX>', 
            permissionLevel: 'MANAGE_GUILD'
        });
    }

    async run(message: Message, args: string[]) {
        if (args.length > 1) return this.client.warning(message.channel, "The prefix must be only one word");

        const prefix = args[0];
        const guild: NewGuild = message.guild as NewGuild;

        const embed: MessageEmbed = new MessageEmbed()
            .setColor(succesGreen)
            .setTimestamp()
            .setFooter(`Prefix set by ${message.member.displayName}`, message.author.displayAvatarURL())

        guild
            .setPrefix(prefix)
            .then((res: string) => message.channel.send(embed.setDescription(res)))
            .catch((res: string) => message.channel.send(this.client.error(message.channel, res)));
    }
}

export = prefix