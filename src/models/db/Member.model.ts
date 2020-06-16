import mongoose, { Schema } from "mongoose";

const MemberSchema: Schema = new Schema({
    userID: {
        type: String,
        required: [ true ]
    },
    guildID: {
        type: String,
        required: [ true ]
    },
    balance: {
        type: Number,
        default: 0.00
    }
});

const Member = mongoose.model("member", MemberSchema);

export = Member;