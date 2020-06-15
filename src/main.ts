import { config } from "dotenv";
import ErosClient from "./models/discord/ErosClient";
import { connect } from "mongoose";

config({ path: "../.env"});

const str: string = `mongodb+srv://Stan:${process.env.MONGO_PASSWORD}@erosdatabase-vdzny.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`

connect(str, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then((res: any) => console.log("✅ Database connection successful"))
.catch((err: any) => console.log(err));

const client: ErosClient = new ErosClient(process.env.DISCORD_TOKEN);