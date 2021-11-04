import "./text-editor.css";
import { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Segment } from "semantic-ui-react";

const TextEditor = () => {
	const [ value, setValue ] = useState<string | undefined>("# Header");
	const [ editing, setEditing ] = useState(false);
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const listener = (event: MouseEvent) => {
			if (ref.current && event.target && ref.current.contains(event.target as Node)) {
				return;
			}
			setEditing(false);
		};
		document.addEventListener("click", listener, { capture: true });
		return () => {
			document.removeEventListener("click", listener, { capture: true });
		};
	}, []);

	if (editing) {
		return (
			<div className="text-editor" ref={ref}>
				<MDEditor value={value} onChange={(v) => setValue(v || "")} autoFocus />
			</div>
		);
	}

	return (
		<Segment className="text-editor" onClick={() => setEditing(true)}>
			<div className="card-content">
				<MDEditor.Markdown source={value} />
			</div>
		</Segment>
	);
};

export default TextEditor;
