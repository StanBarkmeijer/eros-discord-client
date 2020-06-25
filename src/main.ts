import { config } from "dotenv";
import { connect } from "mongoose";
import { Structures, GuildMember } from "discord.js";

import ErosClient from "./models/discord/ErosClient";
import Guild from "./models/discord/Guild";
import NewMember from "./models/discord/Member";

config({ path: "../.env"});

const str: string = `mongodb+srv://Stan:${process.env.MONGO_PASSWORD}@erosdatabase-vdzny.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`

connect(str, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then((res: any) => console.log("✅ Database connection successful"))
.catch((err: any) => console.log(err));

Structures.extend("GuildMember", (member: typeof GuildMember) => NewMember);
Structures.extend("Guild", (guild: typeof Guild) => Guild);

new ErosClient(process.env.DISCORD_TOKEN);