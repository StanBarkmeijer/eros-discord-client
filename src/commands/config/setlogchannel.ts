import ErosClient from "../../models/discord/ErosClient";
import Command from "../../models/command/Command.class";
import { Message, MessageEmbed } from "discord.js";
import NewGuild from "../../models/discord/Guild";
import { succesGreen } from "../../colors";

class logchannel extends Command {

    constructor(client: ErosClient) {
        super(client, {
            name: 'setlogchannel', 
            aliases: ['logchannel', 'setlog'], 
            description: 'Set the logging channel of the server.\nIf no channel was provided, set to the channel the message was set in', 
            category: 'config', 
            usage: 'logchannel [ID | MENTION]', 
            permissionLevel: 'MANAGE_GUILD'
        });
    }

    async run(message: Message, args: string[]) {
        if (args.length > 1) { 
            return this.client.warning(message.channel, `You can only set **1** log channel.\nNow you provided **${args.length}** values.`);
        }

        let channel: string;

        if (message.mentions.channels.size > 0) {
            channel = message.mentions.channels.first().id;
        } else {
            if (args[0] && message.guild.channels.cache.get(args[0])) {
                channel = args[0];
            }
        }

        if (!channel) {
            channel = message.channel.id;
        }
        
        const guild: NewGuild = message.guild as NewGuild;

        const embed: MessageEmbed = new MessageEmbed()
            .setColor(succesGreen)
            .setTimestamp()
            .setFooter(`Log channel set by ${message.member.displayName}`, message.author.displayAvatarURL())

        guild
            .setLogchannel(channel)
            .then((res: string) => message.channel.send(embed.setDescription(res)))
            .catch((res: string) => message.channel.send(this.client.error(message.channel, res)));
    }
}

export = logchannel;