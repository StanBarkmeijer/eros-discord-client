import ErosClient from "../../models/discord/ErosClient";
import Command from "../../models/command/Command.class";
import { Message, MessageEmbed, TextChannel } from "discord.js";

const fetch = require("node-fetch");

class reddit extends Command {

    constructor(client: ErosClient) {
        super(client, {
            name: 'reddit', 
            aliases: ['red', 'subreddit', 'sub'], 
            description: 'Gets a random image from the subreddit you provided', 
            category: 'information', 
            usage: '<reddit <SUBREDDIT>'
        });
    }

    async run(message: Message, args: string[]) {
        const sub: string = args[0];    
        const res = await fetch(`http://h2892166.stratoserver.net/api/meme/?subs=${sub}`).then((r: any) => r.json());

        if (res.status === 400) {
            return this.client.error(message.channel, "Something went wrong with the server. Please try again later");
        }    
        
        const article = res.article;

        let text: string;

        // Too long text
        if (article.text.length > 2000) {
            text = (article.text as string).slice(0, 1500) + `\n\nTo read more, visit the [link](${article.link})`
        } else {
            text = article.text;
        }

        const embed: MessageEmbed = new MessageEmbed()
            .setTitle(`${article.title} :: ${article.subreddit}`)
            .setAuthor(article.author)
            .setURL(article.link)
            .setDescription(text)
            .setFooter(`Upvotes: ${article.upvotes} 🔼`)
            .setImage(article.image.endsWith(".gifv") 
                ? article.image.replace("gifv", "gif") 
                : article.image);       

        // @ts-ignore
        if ((message.channel.nsfw === false || message.channel.nsfw === undefined) && article.nsfw) {
            return this.client
                .warning(message.channel, `${message.member.displayName}, the article we found is NSFW. This is not an NSFW chat.`)
                .then((msg: Message) => msg.delete({ timeout: 5000 }))
        } else {
            message.channel.send(embed);
        }
    }
}

export = reddit;