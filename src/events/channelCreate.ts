import ErosClient from "../models/discord/ErosClient";
import { DMChannel, GuildChannel, TextChannel, MessageEmbed, GuildAuditLogs, GuildAuditLogsEntry } from "discord.js";
import NewGuild from "../models/discord/Guild";
import { succesGreen } from "../colors";
import { stripIndents } from "common-tags";

export = async (client: ErosClient, channel: GuildChannel) => {
    const guild: NewGuild = channel.guild as NewGuild;

    if (!guild.getLogChannel()) return;

    const logChannel: TextChannel = guild.channels.cache.get(guild.getLogChannel()) as TextChannel;

    const audit: GuildAuditLogs = await guild.fetchAuditLogs({ type: "CHANNEL_CREATE" });
    const entry: GuildAuditLogsEntry = audit.entries.first();

    const str: string = `**- Channel:** ${channel.name} (${channel.id})
    **- Type:** ${channel.type}
    **- Creator:** ${entry.executor.tag} (${entry.executor.id})`;

    const embed: MessageEmbed = new MessageEmbed()
        .setTimestamp()
        .setTitle(`Channel created 📂`)
        .setColor(succesGreen)
        .setDescription(stripIndents`${str}`);

    logChannel.send(embed);
}