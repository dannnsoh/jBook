import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localforage from "localforage";

const fileCache = localforage.createInstance({
	name: "filecache"
});

export const fetchPlugin = (inputCode: string) => {
	return {
		// name is mainly to identify this plugin for debugging purposes
		name: "fetch-plugin",
		setup(build: esbuild.PluginBuild) {
			// onLoad event listener (override esbuild's default file loading process)

			// handle root entry file of index.js
			build.onLoad({ filter: /(^index\.js$)/ }, () => {
				return {
					loader: "jsx",
					contents: inputCode
				};
			});

			// handle check to see if file has already been fetched and if it is in the cache
			build.onLoad({ filter: /.*/ }, async (args: any) => {
				const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
				// If it is in the cache, return it immediately
				if (cachedResult) {
					return cachedResult;
				}
			});

			//handle css files
			build.onLoad({ filter: /(.css$)/ }, async (args: any) => {
				const { data, request } = await axios.get(args.path);
				// workaround to get css files as esbuild does not support importing css files from js files as of now
				// comb through the css file to replace all new lines, single and double quotes
				const escaped = data.replace(/\n/g, "").replace(/"/g, '\\"').replace(/'/g, "\\'");
				const contents = `
					const style = document.createElement("style");
					style.innerText = "${escaped}";
					document.head.appendChild(style);
					`;
				const result: esbuild.OnLoadResult = {
					loader: "jsx",
					contents: contents,
					resolveDir: new URL("./", request.responseURL).pathname
				};
				await fileCache.setItem(args.path, result);
				return result;
			});

			// handle all other files
			build.onLoad({ filter: /.*/ }, async (args: any) => {
				const { data, request } = await axios.get(args.path);
				const result: esbuild.OnLoadResult = {
					loader: "jsx",
					contents: data,
					resolveDir: new URL("./", request.responseURL).pathname
				};
				await fileCache.setItem(args.path, result);
				return result;
			});
		}
	};
};
