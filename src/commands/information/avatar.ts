import ErosClient from "../../models/discord/ErosClient";
import Command from "../../models/command/Command.class";

class Avatar extends Command {

    constructor(client: ErosClient) {
        super(client, {
            name: "avatar",
            aliases: ["av"],
            description: "Returns your avatar - or the person you mentioned",
        });
    }

}

export = Avatar;