import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
	return {
		// name is mainly to identify this plugin for debugging purposes
		name: "unpkg-path-plugin",
		// setup of bundling process
		setup(build: esbuild.PluginBuild) {
			// onResolve event listener (override esbuild's default process of figuring out where the main file is stored)
			// can have multiple onResolve functions for different types of files, with the regex filter changing to look for the different types of files
			// return path to where the main file is stored (in this case, index.js as defined in the "entry point")
			// namespace is an "identifier" which can be used in onLoad to apply the onLoad function to only the files with the specified namespace

			// handle root entry file of index.js
			build.onResolve({ filter: /(^index\.js$)/ }, () => {
				return { path: "index.js", namespace: "a" };
			});

			// handle relative paths in a module
			build.onResolve({ filter: /^\.+\// }, async (args: any) => {
				return {
					namespace: "a",
					path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href
				};
			});
			// handle main file of a module
			build.onResolve({ filter: /.*/ }, async (args: any) => {
				return {
					namespace: "a",
					path: `https://unpkg.com/${args.path}`
				};
			});
		}
	};
};
