import ErosClient from "../discord/ErosClient";
import { Message } from "discord.js";
import CommandInterface from "./Command.interface";

class Command implements CommandInterface {

    readonly client: ErosClient;

    readonly name: string;
    readonly aliases: string[];
    readonly description: string;
    readonly usage: string
    readonly permissionLevel: string;
    readonly dmChannel: boolean;

    constructor(client: ErosClient, data: CommandInterface) {
        this.client = client;

        this.name = data.name;
        this.aliases = data.aliases ?? [];
        this.description = data.description;
        this.usage = data.usage ?? "No arguments";
        this.permissionLevel = data.permissionLevel ?? "SEND_MESSAGES";
        this.dmChannel = data.dmChannel ?? false;
    }

    public async run(message: Message, args: string[]) {
        throw new Error("No run function implemented");
    }

}

export = Command;