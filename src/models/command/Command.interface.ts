interface CommandInterface {
    name: string;
    aliases?: string[];
    description: string;
    usage?: string;
    permissionLevel?: string;
    dmChannel?: boolean;
}

export = CommandInterface;