import { config } from "dotenv";
import { connect } from "mongoose";
import { Structures } from "discord.js";

import ErosClient from "./models/discord/ErosClient";
import Member from "./models/discord/Member";
import Guild from "./models/discord/Guild";

config({ path: "../.env"});

const str: string = `mongodb+srv://Stan:${process.env.MONGO_PASSWORD}@erosdatabase-vdzny.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`

connect(str, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then((res: any) => console.log("✅ Database connection successful"))
.catch((err: any) => console.log(err));

Structures.extend("GuildMember", Member);
Structures.extend("Guild", Guild);

new ErosClient(process.env.DISCORD_TOKEN);