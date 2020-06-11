type permissions =
    | 'ADMINISTRATOR'
    | 'MANAGE_GUILD'
    | 'VIEW_AUDIT_LOG'
    | 'MANAGE_CHANNELS'
    | 'BAN_MEMBERS'
    | 'KICK_MEMBERS'
    | 'CREATE_INSTANT_INVITE'
    | 'ADD_REACTIONS'
    | 'PRIORITY_SPEAKER'
    | 'STREAM'
    | 'VIEW_CHANNEL'
    | 'SEND_MESSAGES'
    | 'SEND_TTS_MESSAGES'
    | 'MANAGE_MESSAGES'
    | 'EMBED_LINKS'
    | 'ATTACH_FILES'
    | 'READ_MESSAGE_HISTORY'
    | 'MENTION_EVERYONE'
    | 'USE_EXTERNAL_EMOJIS'
    | 'VIEW_GUILD_INSIGHTS'
    | 'CONNECT'
    | 'SPEAK'
    | 'MUTE_MEMBERS'
    | 'DEAFEN_MEMBERS'
    | 'MOVE_MEMBERS'
    | 'USE_VAD'
    | 'CHANGE_NICKNAME'
    | 'MANAGE_NICKNAMES'
    | 'MANAGE_ROLES'
    | 'MANAGE_WEBHOOKS'
    | 'MANAGE_EMOJIS';

interface CommandInterface {
    name: string;
    aliases?: string[];
    description: string;
    usage?: string;
    permissionLevel?: permissions;
    dmChannel?: boolean;
}

export = CommandInterface;