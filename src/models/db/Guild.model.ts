import mongoose, { Schema } from "mongoose";

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

const GuildModel = mongoose.model("guild", GuildSchema);

export = GuildModel;