import ErosClient from "../../models/discord/ErosClient";
import Command from "../../models/command/Command.class";
import { Message, Collection, GuildMember } from "discord.js";
import { getMemberFromMessage } from "../../config/utils";

class clear extends Command {

    constructor(client: ErosClient) {
        super(client, {
            name: 'clear', 
            aliases: ['purge', 'nuke'], 
            description: 'Clears the channel', 
            category: 'moderation', 
            usage: 'clear <NUMBER between 2 and 100>', 
            permissionLevel: 'KICK_MEMBERS'
        });
    }

    async run(message: Message, args: string[]) {
        if (!args[0]) {
            return this.client.warning(message.channel, "No amount of messages provided");
        }

        if (isNaN(+args[0])) {
            return this.client.warning(message.channel, `The argument \`${args[0]}\` you provided is not a number`);
        }

        const num: number = +args[0];

        if (num <= 2 || num > 100) {
            return this.client.warning(message.channel, `The amount of messages to delete must be between **2** and **100**\nYou provided \`${num}\``);
        }

        if (!args[1]) {
            message.channel
                .bulkDelete(num, true)
                .then((messages: Collection<string, Message>) => message.channel.send(`Deleted \`${messages.size}\` messages`))
                .catch((err: Error) => this.client.error(message. channel, `Couldn't delete messages\n${err}`));
        } else {
            const member: GuildMember = getMemberFromMessage(message, 1);
            const messages: Collection<string, Message> = await (await message.channel.messages
                .fetch({ limit: num }))
                .filter((msg: Message) => msg.author.id === member.id);

            message.channel
                .bulkDelete(messages, true)
                .then((messages: Collection<string, Message>) => message.channel.send(`Deleted \`${messages.size}\` messages from \`${member.displayName}\``))
                .catch((err: Error) => this.client.error(message. channel, `Couldn't delete messages\n${err}`));
        }
    }
}

export = clear;