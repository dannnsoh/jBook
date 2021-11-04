import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

// to check if esbuild has been initialized
let service: boolean = false;

const bundle = async (rawCode: string) => {
	if (!service) {
		// initialize esbuild
		await esbuild.initialize({
			worker: true,
			wasmURL: "https://unpkg.com/esbuild-wasm/esbuild.wasm"
		});
		service = true;
	} else {
		// bundle code
		try {
			const result = await esbuild.build({
				entryPoints: [ "index.js" ],
				bundle: true,
				write: false,
				plugins: [ unpkgPathPlugin(), fetchPlugin(rawCode) ],
				define:
					{
						"process.env.NODE_ENV": '"production"',
						global: "window"
					}
			});
			return {
				code: result.outputFiles[0].text,
				err: ""
			};
		} catch (err) {
			if (err instanceof Error) {
				return {
					code: "",
					err: err.message
				};
			} else {
				console.log("Error occurred!");
			}
		}
	}
};

export default bundle;
