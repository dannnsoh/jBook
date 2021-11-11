import "./code-editor.css";
import { useRef } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { Button, Icon } from "semantic-ui-react";

interface EditorProps {
	initialValue: string;
	onChange(value: string): void;
}

const CodeEditor = ({ initialValue, onChange }: EditorProps) => {
	const editorRef = useRef<any>(null);

	const onEditorMount: OnMount = (editor, monaco) => {
		editorRef.current = editor;
		editor.onDidChangeModelContent(() => {
			onChange(editor.getValue());
		});
	};

	const onFormatClick = () => {
		// get current value from editor instance
		const unformatted = editorRef.current.getValue();
		// format that value
		const formatted = prettier
			.format(unformatted, {
				parser: "babel",
				plugins: [ parser ],
				useTabs: true,
				semi: true
			})
			// remove new line added by prettier
			.replace(/\n$/, "");
		// set formatted value back into the editor
		editorRef.current.setValue(formatted);
	};

	return (
		<div className="editor-wrapper">
			<Button icon animated="fade" labelPosition="right" className="button-format" onClick={onFormatClick}>
				<Button.Content visible className="text-center">
					<Icon name="paint brush" />
				</Button.Content>
				<Button.Content hidden>Format</Button.Content>
			</Button>
			<Editor
				onMount={onEditorMount}
				value={initialValue}
				theme="vs-dark"
				language="javascript"
				height="100%"
				options={{
					wordWrap: "on",
					minimap:
						{
							enabled: false
						},
					showUnused: false,
					folding: false,
					lineNumbersMinChars: 3,
					fontSize: 16,
					scrollBeyondLastLine: false,
					automaticLayout: true
				}}
			/>
		</div>
	);
};

export default CodeEditor;
