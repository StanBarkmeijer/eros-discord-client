import ErosClient from "../models/discord/ErosClient";
import { DMChannel, GuildChannel, TextChannel, MessageEmbed, GuildAuditLogs, GuildAuditLogsEntry, AuditLogChange } from "discord.js";
import NewGuild from "../models/discord/Guild";
import { warningOrange } from "../colors";
import { stripIndents } from "common-tags";

export = async (client: ErosClient, oldChannel: GuildChannel, newChannel: GuildChannel) => {
    const guild: NewGuild = oldChannel.guild as NewGuild;

    if (!guild.getLogChannel()) return;

    const logChannel: TextChannel = guild.channels.cache.get(guild.getLogChannel()) as TextChannel;

    const audit: GuildAuditLogs = await guild.fetchAuditLogs({ type: "CHANNEL_UPDATE" });
    const entry: GuildAuditLogsEntry = audit.entries.first();

    if (entry.createdAt < new Date()) return;

    let str: string = `**- Changes by:** ${entry.executor.tag} (${entry.executor.id})`;

    entry.changes.forEach((change: AuditLogChange) => {
        str += `\n**- ${change.key.charAt(0).toUpperCase() + change.key.slice(1)}:** ${change.old} -> ${change.new}`;
    });

    const embed: MessageEmbed = new MessageEmbed()
        .setTimestamp()
        .setTitle(`Channel updated ♻`)
        .setColor(warningOrange)
        .setDescription(stripIndents`${str}`);

    logChannel
        .send(embed)
        .catch(()=>{});
}