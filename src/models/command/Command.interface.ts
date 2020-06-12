import { PermissionResolvable } from "discord.js";

interface CommandInterface {
    name: string;
    aliases?: string[];
    description: string;
    usage?: string;
    permissionLevel?: PermissionResolvable;
    dmChannel?: boolean;
}

export = CommandInterface;