import { Client, MessageEmbed, Collection, DMChannel, TextChannel, NewsChannel, Message } from "discord.js";
import Command from "../command/Command.class";
import { readdirSync } from "fs";
import logger from "../../config/logger";
import { connect, Connection } from "mongoose";
import { errorRed, warningOrange, succesGreen } from "../../colors";

class ErosClient extends Client {

	readonly commands: Collection<string, Command>;
	readonly aliases: Collection<string, string> = new Collection();

	constructor(token: string) {
		super();
		super.login(token);
		
		this.commands = this.loadCommands();
		this.loadEvents();
	}


	public warning(channel: TextChannel | DMChannel | NewsChannel, err: string): Promise<Message> {
		const embed: MessageEmbed = new MessageEmbed()
			.setColor(warningOrange)
			.setTimestamp()
			.setFooter(this.user.username, this.user.displayAvatarURL())
			.setDescription(err);

		return channel.send(embed);
	}

	public error(channel: TextChannel | DMChannel | NewsChannel, err: string): Promise<Message> {
		const embed: MessageEmbed = new MessageEmbed()
			.setColor(errorRed)
			.setTimestamp()
			.setFooter(this.user.username, this.user.displayAvatarURL())
			.setDescription(err);

		return channel.send(embed);
	}

	public succes(channel: TextChannel | DMChannel | NewsChannel, succes: string): Promise<Message> {
		const embed: MessageEmbed = new MessageEmbed()
			.setColor(succesGreen)
			.setTimestamp()
			.setFooter(this.user.username, this.user.displayAvatarURL())
			.setDescription(succes);

		return channel.send(embed);
	}

	private loadCommands(): Collection<string, Command> {
		const map: Collection<string, Command> = new Collection();
		
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

					if (pull.aliases) {
						pull.aliases.forEach((alias: string) => {
							this.aliases.set(alias, pull.name);
						});
					}

					logger.info(`-- ${file} ✅`);
				} catch(e) {
					logger.info(`-- ${file} ❌`);
				}

			}

			console.log("\n");

		}

		return map;
	}

	private loadEvents(): void {
		const events = readdirSync("./events/").filter((f: string) => f.endsWith(".js"));

		for (let file of events) {
			const evt = require(`../../events/${file}`);

			const eName: any = file.split(".")[0];
			this.on(eName, evt.bind(null, this));
		}
	}

}

export = ErosClient;
