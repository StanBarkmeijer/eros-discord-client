import { model, Schema, Model, Document } from "mongoose";

const GuildSchema: Schema = new Schema({
    guildID: {
        type: String,
        required: [ true ]
    },
    prefix: {
        type: String,
        default: "<",
        required: [ false ]
    },
    logChannel: {
        type: String,
        required: [ false ]
    }
});

const Guild: any = model("guild", GuildSchema);

export = Guild;