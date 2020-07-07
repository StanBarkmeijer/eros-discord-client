import ErosClient from "../../models/discord/ErosClient";
import Command from "../../models/command/Command.class";
import * as os from 'os';

import { Message, MessageEmbed } from "discord.js";
import { erosRed } from "../../colors";
import { stripIndents } from "common-tags";
import { cpuUsage, memoryUsage } from "process";

class botinfo extends Command {

    constructor(client: ErosClient) {
        super(client, {
            name: 'botinfo', 
            aliases: ['bot', 'binfo', 'botinf'], 
            description: 'Returns information about the bot', 
            category: 'information'
        });
    }

    async run(message: Message, args: string[]) {
        const invite: string = await this.client.generateInvite("ADMINISTRATOR");

        const botInfo: string = `**Name:** ${message.guild.me.displayName}
        **Servers:** ${this.client.guilds.cache.size}
        **Members:** ${this.client.users.cache.size}
        **Online since:** ${this.client.readyAt.toLocaleString()}
        **Invite:** [Click me](${invite})`;

        const info: string = `**Name:** ${os.hostname()}
        **OS Type:** ${os.type()}
        **Platform:** ${os.platform()}
        **Version:** ${os.release()}
        **CPU:** ${os.cpus()[0].model}`;

        const embed: MessageEmbed = new MessageEmbed()
            .setColor(erosRed)
            .setFooter("Existing since: ", this.client.user.displayAvatarURL())
            .setTimestamp(this.client.user.createdAt)
            .addField("Discord:", stripIndents`${botInfo}`, true)
            .addField("Info:", stripIndents`${info}`, true)
            .setThumbnail(this.client.user.displayAvatarURL({ dynamic: true, format: "png", size: 512 }));

        message.channel.send(embed);
    }
}

export = botinfo;