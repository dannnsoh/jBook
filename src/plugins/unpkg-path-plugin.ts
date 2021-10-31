import * as esbuild from "esbuild-wasm";
import axios from "axios";

export const unpkgPathPlugin = () => {
	return {
		// name is mainly to identify this plugin for debugging purposes
		name: "unpkg-path-plugin",
		// setup of bundling process
		setup(build: esbuild.PluginBuild) {
			// onResolve event listener (override esbuild's default process of figuring out where the main file is stored)
			// can have multiple onResolve listeners for different types of files, with the regex filter changing to look for the different types of files
			build.onResolve({ filter: /.*/ }, async (args: any) => {
				console.log("onResolve", args);
				if (args.path === "index.js") {
					return { path: args.path, namespace: "a" };
				}

				return {
					namespace: "a",
					path: `https://unpkg.com/${args.path}`
				};
				// else {
				// 	// return path to where the main file is stored (in this case, index.js as defined in the "entry point")
				// 	// namespace is an "identifier" which can be used in onLoad to apply the onLoad function to only the files with the specified namespace
				// 	return { path: "https://unpkg.com/tiny-test-pkg@1.0.0/index.js", namespace: "a" };
				// }
			});
			// onLoad event listener (override esbuild's default file loading process)
			build.onLoad({ filter: /.*/ }, async (args: any) => {
				console.log("onLoad", args);
				if (args.path === "index.js") {
					return {
						loader: "jsx",
						contents:
							`
                            const message = require("tiny-test-pkg");
                            console.log(message);
                        `
					};
				}

				const { data }: any = await axios.get(args.path);
				return {
					loader: "jsx",
					contents: data
				};
			});
		}
	};
};
