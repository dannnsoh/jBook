import Editor from "@monaco-editor/react";

const CodeEditor = () => {
	return (
		<Editor
			theme="vs-dark"
			language="javascript"
			height="50vh"
			options={{
				wordWrap: "on",
				minimap:
					{
						enabled: false
					}
			}}
		/>
	);
};

export default CodeEditor;
