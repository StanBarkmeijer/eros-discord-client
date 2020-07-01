import ErosClient from "../../models/discord/ErosClient";
import Command from "../../models/command/Command.class";
import { Message, MessageEmbed, GuildMember } from "discord.js";
import utils from "../../config/utils";

const getColors = require("get-image-colors");

class Avatar extends Command {

    constructor(client: ErosClient) {
        super(client, {
            name: "avatar",
            aliases: ["av"],
            description: "Returns your avatar - or the person you mentioned",
            usage: "<avatar [id | mention]",
            category: "information"
        });
    }

    async run(message: Message, args: string[]) {
        const member: GuildMember = utils.getMemberFromMessage(message, 0);
        
        const embed: MessageEmbed = new MessageEmbed()
            .setImage(member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setTitle(`${member.displayName}'s profile picture`);

        getColors(member.user.displayAvatarURL({ format: "png" })).then((colors: any) => {
            message.channel.send(
                embed.setColor(colors.map((color: any) => color.hex())[0])
            );
        });
    }   

}

export = Avatar;