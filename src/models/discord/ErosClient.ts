import { Client } from "discord.js";

class ErosClient extends Client {

	constructor(token: string) {
		super();

		super.login(token);
	}

}

export = ErosClient;