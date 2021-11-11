import path from "path";
import { Command } from "commander";
import { serve } from "@jsnote-dan/local-api";

const isProduction = process.env.NODE_ENV === "production";

export const serveCommand = new Command()
	.command("serve [filename]")
	.description("Open a file for editing")
	.option("-p, --port <number>", "Port to run server on", "4005")
	.action(async (filename = "notebook.js", options: { port: string }) => {
		try {
			// dir of the file to be served
			const dir = path.join(process.cwd(), path.dirname(filename));
			// serve function from local-api
			await serve(
				parseInt(options.port),
				path.basename(filename),
				dir,
				!isProduction
			);
			console.log(
				`Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file.`
			);
		} catch (err) {
			if (err instanceof Error && err.message.includes("EADDRINUSE")) {
				console.error("Port is in use. Try running on a different port.");
			} else {
				throw err;
			}

			process.exit(1);
		}
	});
