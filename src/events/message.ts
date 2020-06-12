import ErosClient from "../models/discord/ErosClient";
import { Message } from "discord.js";

export = async (client: ErosClient, message: Message) => {
    const prefix = "<";
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    let command;

    if (message.author.bot || !message.guild) return;

    if (!message.content.startsWith(prefix)) return;

    if (cmd.length === 0) return;
    if (client.commands.has(cmd)) command = client.commands.get(cmd);
    else if (client.aliases.has(cmd)) command = client.commands.get(client.aliases.get(cmd));

    if (command) {
        if (!message.member.hasPermission(command.permissionLevel)) {
            client.warning(message.channel, `You don't have permission: ${command.permissionLevel}`);
        } else {
            command.run(message, args);
        }
    }
}