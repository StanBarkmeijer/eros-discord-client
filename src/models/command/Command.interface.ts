import { PermissionResolvable } from "discord.js";

interface CommandInterface {
    name: string;
    aliases?: string[];
    description: string;
    category?: string;
    usage?: string;
    permissionLevel?: PermissionResolvable;
    dmChannel?: boolean;
}

export = CommandInterface;