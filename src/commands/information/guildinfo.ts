import ErosClient from "../../models/discord/ErosClient";
import Command from "../../models/command/Command.class";
import { Message, MessageEmbed, GuildChannel } from "discord.js";
import NewGuild from "../../models/discord/Guild";
import { stripIndents } from "common-tags";

const getColors = require("get-image-colors");

class guildinfo extends Command {

    constructor(client: ErosClient) {
        super(client, {
            name: 'guildinfo', 
            aliases: ['guild', 'serverinfo', 'server', 'serverinf', 'guildinf'], 
            description: 'Sends the information of the server', 
            category: 'information', 
            usage: 'guildinfo'
        });
    }

    async run(message: Message, args: string[]) {
        const guild: NewGuild = message.guild as NewGuild;

        const textChannelSize: number = guild.channels.cache.filter((c: GuildChannel) => c.type === "text").size;
        const voiceChannelSize: number = guild.channels.cache.filter((c: GuildChannel) => c.type === "voice").size;

        const guildInfo: string = 
        `- Server name: ${guild.name}
        -Server owner: ${guild.owner}
        -Region: ${guild.region[0].toUpperCase() + guild.region.slice(1)}
        -ID: ${guild.id}
        -Members: ${guild.memberCount}
        -Text channels: ${textChannelSize}
        -Voice channels: ${voiceChannelSize}`;

        const configInfo: string = 
        `-Prefix: ${guild.getPrefix()}
        -Log channel: #${guild.getLogChannel() ? guild.channels.cache.get(guild.getLogChannel()).name : "N/A"}`;

        const embed: MessageEmbed = new MessageEmbed()
            .setThumbnail(guild.iconURL({ format: "png", dynamic: true, size: 1024 }))
            .addField("Information", stripIndents`${guildInfo}`, true)
            .addField("Configuration", stripIndents`${configInfo}`, true);

        if (guild.banner) {
            embed.setImage(guild.banner);
        }

        getColors(guild.iconURL({ format: "png" })).then((colors: any) => {
            embed.setColor(colors.map((color: any) => color.hex())[0])
        });
        
        message.channel.send(embed);
    }
}

export = guildinfo;
