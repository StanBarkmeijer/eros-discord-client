import ErosClient from "../../models/discord/ErosClient";
import Command from "../../models/command/Command.class";
import { Message, MessageEmbed, GuildChannel } from "discord.js";
import NewGuild from "../../models/discord/Guild";

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
        `_Server name:_ ${guild.name}
        _Server owner:_ ${guild.owner}
        _Region:_ ${guild.region[0].toUpperCase() + guild.region.slice(1)}
        _ID:_ ${guild.id}
        _Members:_ ${guild.memberCount}
        _Text channels:_ ${textChannelSize}
        _Voice channels:_ ${voiceChannelSize}`;

        const configInfo: string = 
        `_Prefix:_ ${guild.getPrefix()}
        _Log channel:_ #${guild.getLogChannel() ? guild.channels.cache.get(guild.getLogChannel()).name : "N/A"}`;

        const embed: MessageEmbed = new MessageEmbed()
            .setThumbnail(guild.iconURL({ format: "png", dynamic: true, size: 1024 }))
            .addField("Information", guildInfo, true)
            .addField("Configuration", configInfo, true);

        if (guild.banner) {
            embed.setImage(guild.banner);
        }

        getColors(guild.iconURL({ format: "png" })).then((colors: any) => {
            message.channel.send(
                embed.setColor(colors.map((color: any) => color.hex())[0])
            );
        });
    }
}

export = guildinfo;