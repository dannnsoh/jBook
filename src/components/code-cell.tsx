import "./code-cell.css";
import { useEffect } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { Loader, Segment } from "semantic-ui-react";

interface CodeCellProps {
	cell: Cell;
}

const CodeCell = ({ cell }: CodeCellProps) => {
	const { updateCell, createBundle } = useActions();
	const bundle = useTypedSelector((state) => state.bundles[cell.id]);

	useEffect(
		() => {
			const timer = setTimeout(async () => {
				createBundle(cell.id, cell.content);
			}, 750);

			return () => {
				clearTimeout(timer);
			};
		},
		[ cell.id, cell.content, createBundle ]
	);

	return (
		<Resizable direction="vertical">
			<div style={{ height: "calc(100% - 10px)", display: "flex", flexDirection: "row" }}>
				<Resizable direction="horizontal">
					<CodeEditor initialValue={cell.content} onChange={(value) => updateCell(cell.id, value)} />
				</Resizable>
				{!bundle || bundle.loading ? (
					<Segment>
						<Loader active indeterminate>
							Loading...
						</Loader>
					</Segment>
				) : (
					<Preview code={bundle.code} bundleError={bundle.err} />
				)}
			</div>
			{/* <Segment>
				<Loader active indeterminate>
					Loading...
				</Loader>
			</Segment> */}
		</Resizable>
	);
};

export default CodeCell;
