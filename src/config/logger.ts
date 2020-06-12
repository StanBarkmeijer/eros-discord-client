import * as tracer from "tracer";

const logger: tracer.Tracer.Logger = tracer.console({
	level: process.env.LOG_LEVEL || "trace",
	format: [
		"{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})",
		{
			error:
                "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})\nCall Stack:\n{{stack}}"
		}
	],
	dateformat: "HH:MM:ss.L"
});

export = logger;