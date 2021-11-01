import * as esbuild from "esbuild-wasm";
import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";
import CodeEditor from "./components/code-editor";

const App = () => {
	const ref = useRef<any>();
	const iframe = useRef<any>();
	const [ input, setInput ] = useState("");

	const startService = async () => {
		await esbuild.initialize({
			worker: true,
			wasmURL: "https://unpkg.com/esbuild-wasm/esbuild.wasm"
		});
		ref.current = true;
	};

	useEffect(() => {
		startService();
	}, []);

	const onClick = async () => {
		if (!ref.current) {
			return;
		} else {
			// reload iframe to prevent user from deleting html structure
			iframe.current.srcdoc = html;
			// bundle code
			const result = await esbuild.build({
				entryPoints: [ "index.js" ],
				bundle: true,
				write: false,
				plugins: [ unpkgPathPlugin(), fetchPlugin(input) ],
				define:
					{
						"process.env.NODE_ENV": '"production"',
						global: "window"
					}
			});
			// pass bundled code into iframe element via a ref
			iframe.current.contentWindow.postMessage(result.outputFiles[0].text, "*");
		}
	};

	// setup event listener for message and eval the message (bundled code)
	// embed this as inner html in iframe using srcdoc attribute
	const html = `
		<html>
			<head></head>
			<body>
				<div id="root"></div>
				<script>
					window.addEventListener("message", (event) => {
						try {
							eval(event.data);
						} catch (err) {
							const root = document.getElementById("root");
							root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
							console.error(err);
						}
					}, false)
				</script>
			</body>
		</html>
	`;

	return (
		<div>
			<CodeEditor />
			<textarea value={input} onChange={(event) => setInput(event.target.value)} />
			<div>
				<button onClick={onClick}>Submit</button>
			</div>
			<iframe title="code preview" ref={iframe} sandbox="allow-scripts" srcDoc={html} />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
