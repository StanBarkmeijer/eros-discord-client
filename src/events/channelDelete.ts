import ErosClient from "../models/discord/ErosClient";
import { DMChannel, GuildChannel, TextChannel, MessageEmbed, GuildAuditLogs, GuildAuditLogsEntry } from "discord.js";
import NewGuild from "../models/discord/Guild";
import { errorRed } from "../colors";
import { stripIndents } from "common-tags";

export = async (client: ErosClient, channel: GuildChannel) => {
    const guild: NewGuild = channel.guild as NewGuild;

    if (!guild.getLogChannel()) return;

    const logChannel: TextChannel = guild.channels.cache.get(guild.getLogChannel()) as TextChannel;

    const audit: GuildAuditLogs = await guild.fetchAuditLogs({ type: "CHANNEL_DELETE" });
    const entry: GuildAuditLogsEntry = audit.entries.first();

    const str: string = `**- Channel:** ${channel.name} 
    **- Type:** ${channel.type}
    **- Deleted by:** ${entry.executor.tag} (${entry.executor.id})`;

    const embed: MessageEmbed = new MessageEmbed()
        .setTimestamp()
        .setTitle(`Channel deleted 🚮`)
        .setColor(errorRed)
        .setDescription(stripIndents`${str}`);

        logChannel
            .send(embed)
            .catch(()=>{});
}