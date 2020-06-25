import ErosClient from "../models/discord/ErosClient";
import { Message, MessageEmbed } from "discord.js";
import NewMember from "../models/discord/Member";
import NewGuild from "../models/discord/Guild";

export = async (client: ErosClient, message: Message) => {
    const prefix = (message.guild as NewGuild).getPrefix();
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    let command;

    if (message.author.bot || !message.guild) return;

    if (!message.content.startsWith(prefix)) {
        const money: number = (message.member as NewMember).getMoney();
        const chance: boolean = ((Math.random() * 20)|0) < 2;

        if (chance) {
            const toAdd: number = (Math.random() * 50)|0;
            (message.member as NewMember)
                .updateMember(money + toAdd);

            const emb = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${message.author} earned: ${toAdd} coins 💸`)

            message.channel
                .send(emb)
                .then((msg: Message) => msg.delete({ timeout: 5000 }));
        }

        return;
    }

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