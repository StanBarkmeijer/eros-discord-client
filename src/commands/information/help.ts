import ErosClient from "../../models/discord/ErosClient";
import Command from "../../models/command/Command.class";

import { Message, MessageEmbed } from "discord.js";
import { readdirSync } from "fs";
import { erosRed } from "../../colors";

class help extends Command {

    constructor(client: ErosClient) {
        super(client, {
            name: 'help', 
            description: 'Return all commands, or a specific one', 
            usage: '<help [command | alias]', 
            category: "information"
        });
    }

    async run(message: Message, args: string[]) {
        if (args[0]) message.channel.send(getCMD(this.client, args[0]));
        else message.channel.send(getAll(this.client));
    }
}

function getAll(client: ErosClient): MessageEmbed {
    const embed: MessageEmbed = new MessageEmbed()
        .setColor(erosRed)
        .setTimestamp()
        .setFooter(`${client.commands.size} commands`, client.user.displayAvatarURL({ dynamic: true }));

    const commands = (category: string): string => {
        return client.commands
            .filter((c: Command) => c.category === category)
            .map((c: Command) => `- \`${c.name}\``)
            .join("\n");
    }

    const info: void = readdirSync("../src/commands")
        .filter((cat: string) => cat !== "dev")
        .forEach((cat: string) => embed.addField(`**${cat[0].toUpperCase() + cat.slice(1)}**`, commands(cat), true));

    return embed;
}

function getCMD(client: ErosClient, searchQuery: string): MessageEmbed {
    const embed: MessageEmbed = new MessageEmbed()
        .setColor(erosRed);

    const command: Command = client.commands.get(searchQuery.toLowerCase()) 
        || client.commands.get(client.aliases.get(searchQuery.toLowerCase()));

    const noInfo = `No information found for command: **${searchQuery}**`;

    if (!command) {
        return embed
            .setDescription(noInfo);
    }

    let info: string = "";

    if (command.aliases && command.aliases.length > 0) info += `\n**Aliases**: ${command.aliases.map(a => `\`${a}\``).join(", ")}`;
    if (command.description) info += `\n**Description**: ${command.description}`;
    if (command.usage) {
        info += `\n**Usage**: ${command.usage}`;
        embed.setFooter(`Syntax: <> = required, [] = optional`);
    } else {
        info += `\n**Usage**: ${command.name}`
    }

    embed.setTitle(`${command.name.charAt(0).toUpperCase() + command.name.slice(1)}`);
    embed.setURL(`https://github.com/StanBarkmeijer/eros-discord-client/tree/master/src/commands/${command.category}/${command.name}.ts`);
    embed.setDescription(info);

    return embed;
}

export = help