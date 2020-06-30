import ErosClient from "../../models/discord/ErosClient";
import Command from "../../models/command/Command.class";
import { Message, MessageEmbed, Role, Activity } from "discord.js";
import NewMember from "../../models/discord/Member";
import { getMemberFromMessage } from "../../config/utils";
import { erosRed } from "../../colors";
import { stripIndents } from "common-tags";

class userinfo extends Command {

    constructor(client: ErosClient) {
        super(client, {
            name: 'userinfo', 
            aliases: ['user', 'uinf', 'whois'], 
            description: 'Sends the information of a user', 
            category: 'information', 
            usage: 'userinfo [id | mention]'
        });
    }

    async run(message: Message, args: string[]) {
        const member: NewMember = getMemberFromMessage(message, 0) as NewMember;

        const roles = member.roles.cache
            .filter((role: Role) => role.name !== "@everyone")
            .map((role: Role) => role)
            .join(", ");

        let serverInfo: string = 
        `-Nickname: ${member.displayName}
        -Join date: ${member.joinedAt.toLocaleString()}
        -Roles: ${roles.length > 0 ? roles : "None"}
        -Money: ${member.getMoney()} 💸`;

        if (member.premiumSince !== null) {
            serverInfo += `\n-Server boost: ${member.premiumSince.toLocaleString()}`;
        }

        const presence: Activity = member.user.presence.activities[0];

        let userInfo: string =
        `-Tag: ${member.user.tag}
        -ID: ${member.user.id}`;
        
        if (presence) {
            if (presence.name === "Custom Status") {
                userInfo += `\n-Custom status: ${presence.state}`;
            } else {
                userInfo += `\n-${presence.type[0] + presence.type.slice(1).toLowerCase()}: ${presence.name}`;
            }
        }
        
        const embed: MessageEmbed = new MessageEmbed()
            .setColor(member.roles.highest.hexColor === "#000000" ? erosRed : member.roles.highest.hexColor)
            .setAuthor(member.displayName, member.user.displayAvatarURL({ dynamic: true }))
            .addField("Server info", stripIndents`${serverInfo}`, true)
            .addField("User info", stripIndents`${userInfo}`, true);
        
        if (presence && presence.name === "Spotify") {
            const spotifyInfo: string = 
            `-Album: ${presence.assets.largeText}
            -Song: ${presence.details}
            -Artists: ${presence.state.replace(/;/g, " &")}`;

            const image: string = presence.assets.largeImage 
                ? presence.assets.largeImage.split(":")[1]
                : presence.assets.smallImage.split(":")[1];
            
            embed
                .addField("Spotify", stripIndents`${spotifyInfo}`, false)
                .setThumbnail(`https://i.scdn.co/image/${image}`);
        }

        message.channel.send(embed);
    }
}

export = userinfo;