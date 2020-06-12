import { Client } from "discord.js";
import Command from "../command/Command.class";
import { readdirSync } from "fs";
import logger from "../../config/logger";

class ErosClient extends Client {

	readonly commands: Map<string, Command>;

	constructor(token: string) {
		super();
		super.login(token);
		
		this.commands = this.loadCommands();
		this.loadEvents();
	}

	private loadCommands(): Map<string, Command> {
		const map: Map<string, Command> = new Map();
		
		console.log("\n")

		const folder: string[] = readdirSync("./commands/");

		for (let subFolder of folder) {

			logger.info(`${subFolder}:`);
			
			const files: string[] = 
				readdirSync(`./commands/${subFolder}/`)
					.filter((f: string) => f.endsWith(".js"));

			for (let file of files) {

				try {
					let pull = require(`../../commands/${subFolder}/${file}`);
					pull = new pull(this);
	
					map.set(pull.name, pull);

					logger.info(`-- ${file} ✅`);
				} catch(e) {
					logger.info(`-- ${file} ❌`);
				}

			}

		}

		console.log("\n")

		return map;
	}

	private loadEvents(): void {
		const events = readdirSync("./events/").filter((f: string) => f.endsWith(".js"));

		for (let file of events) {
			const evt = require(`../events/${file}`);

			const eName: any = file.split(".")[0];
			this.on(eName, evt.bind(null, this));
		}
	}

}

export = ErosClient;