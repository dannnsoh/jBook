import "./cell-list-item.css";
import { Cell } from "../state";
import ActionBar from "./action-bar";
import CodeCell from "./code-cell";
import TextEditor from "./text-editor";

interface CellListItemProps {
	cell: Cell;
}
const CellListItem = ({ cell }: CellListItemProps) => {
	return (
		<div className="cell-list-item">
			<div className="action-bar-wrapper">
				<ActionBar id={cell.id} />
			</div>
			{cell.type === "code" ? <CodeCell cell={cell} /> : <TextEditor cell={cell} />}
		</div>
	);
};

export default CellListItem;
