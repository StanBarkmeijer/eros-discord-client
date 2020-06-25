import ErosClient from "../models/discord/ErosClient"
import { MessageEmbed } from "discord.js";

export = (client: ErosClient, error: Error) => {
    const channel: any = client.guilds.cache
        .get("720571114077814844")
        .channels.cache
        .get("723888825373425684");

    const embed: MessageEmbed = new MessageEmbed()
        .setColor("RED")
        .setTimestamp()
        .setDescription(error)

    channel.send("<@229258267187085316>", { embed: embed });
}