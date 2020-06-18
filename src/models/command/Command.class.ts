import ErosClient from "../discord/ErosClient";
import { Message, PermissionResolvable } from "discord.js";
import CommandInterface from "./Command.interface";

class Command implements CommandInterface {

    readonly client: ErosClient;

    readonly name: string;
    readonly aliases: string[];
    readonly description: string;
    readonly category: string;
    readonly usage: string
    readonly permissionLevel: PermissionResolvable;

    constructor(client: ErosClient, data: CommandInterface) {
        this.client = client;

        this.name = data.name;
        this.aliases = data.aliases ?? [];
        this.description = data.description;
        this.category = data.category ?? "N/A"
        this.usage = data.usage ?? "No arguments";
        this.permissionLevel = data.permissionLevel ?? ["SEND_MESSAGES"];
    }

    public async run(message: Message, args: string[]) {
        throw new Error("No run function implemented");
    }

}

export = Command;