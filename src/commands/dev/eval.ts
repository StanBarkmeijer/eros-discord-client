import ErosClient from "../../models/discord/ErosClient";
import Command from "../../models/command/Command.class";
import { Message } from "discord.js";

class Eval extends Command {

    constructor(client: ErosClient) {
        super(client, {
            name: 'eval', 
            aliases: ['e'], 
            description: 'Evaluates JavaScript code', 
            usage: 'eval <CODE>', 
            category: 'dev'
        });
    }

    async run(message: Message, args: string[]) {
        if (message.author.id !== "229258267187085316") {
            return this.client.error(message.channel, "You're not a developer of this bot");
        }

        const toEval = args.join(" ");

        try {
            // @ts-ignore
            let evaled = eval(toEval);

            if (typeof evaled !== "string") {
                evaled = require("util").inspect(evaled);
            }

            message.channel
                .send(clean(evaled), { code: "xl" })
                .catch((err: Error) => message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``));
        } catch (e) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(e)}\n\`\`\``);
        }
    }
}

function clean(text: any) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

export = Eval;