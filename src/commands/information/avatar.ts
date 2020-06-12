import ErosClient from "../../models/discord/ErosClient";
import Command from "../../models/command/Command.class";
import { Message, MessageEmbed } from "discord.js";
import utils from "../../config/utils";

const getColors = require("get-image-colors");

class Avatar extends Command {

    constructor(client: ErosClient) {
        super(client, {
            name: "avatar",
            aliases: ["av"],
            description: "Returns your avatar - or the person you mentioned",
            usage: "<avatar [ID|MENTION]"
        });
    }

    async run(message: Message, args: string[]) {
        const member = await utils.getMemberFromMessage(message);
        
        const embed = new MessageEmbed()
            .setImage(member.user.displayAvatarURL({ format: "png", size: 1024 }))
            .setTitle(`${member.displayName}'s profile picture`);

        getColors(member.user.displayAvatarURL({ format: "png" })).then((colors: any) => {
            message.channel.send(
                embed.setColor(colors.map((color: any) => color.hex())[0])
            );
        });
    }   

}

export = Avatar;