import ErosClient from "../../models/discord/ErosClient";
import Command from "../../models/command/Command.class";
import { Message, MessageEmbed, Role, Activity } from "discord.js";
import NewMember from "../../models/discord/Member";
import { getMemberFromMessage } from "../../config/utils";
import { erosRed } from "../../colors";

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
        `_Nickname:_ ${member.displayName}
        _Join date:_ ${member.joinedAt.toLocaleString()}
        _Roles:_ ${roles.length > 0 ? roles : "None"}
        _Money:_ ${member.getMoney()} 💸`;

        if (member.premiumSince !== null) {
            serverInfo += `\n_Server boost:_ ${member.premiumSince.toLocaleString()}`;
        }

        const presence: Activity = member.user.presence.activities[0];

        let userInfo: string =
        `_Tag:_ ${member.user.tag}
        _ID:_ ${member.user.id}`;
        
        if (presence) {
            if (presence.name === "Custom Status") {
                userInfo += `\n_Custom status:_ ${presence.state}`;
            } else {
                userInfo += `\n_${presence.type[0] + presence.type.slice(1).toLowerCase()}:_ ${presence.name}`;
            }
        }
        
        const embed: MessageEmbed = new MessageEmbed()
            .setColor(member.roles.highest.hexColor === "#000000" ? erosRed : member.roles.highest.hexColor)
            .setAuthor(member.displayName, member.user.displayAvatarURL({ dynamic: true }))
            .addField("Server info", serverInfo, true)
            .addField("User info", userInfo, true);
        
        if (presence.name === "Spotify") {
            const spotifyInfo: string = 
            `_Album:_ ${presence.assets.largeText}
            _Song:_ ${presence.details}
            _Artists:_ ${presence.state.replace(/;/g, " &")}`;

            const image: string = presence.assets.largeImage 
                ? presence.assets.largeImage.split(":")[1]
                : presence.assets.smallImage.split(":")[1];
            
            embed
                .addField("Spotify", spotifyInfo, false)
                .setThumbnail(`https://i.scdn.co/image/${image}`);
        }

        message.channel.send(embed);
    }
}

export = userinfo;