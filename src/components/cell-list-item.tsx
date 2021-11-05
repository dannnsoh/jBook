import { Cell } from "../state";
import CodeCell from "./code-cell";
import TextEditor from "./text-editor";

interface CellListItemProps {
	cell: Cell;
}
const CellListItem = ({ cell }: CellListItemProps) => {
	return <div>{cell.type === "code" ? <CodeCell /> : <TextEditor />}</div>;
};

export default CellListItem;
