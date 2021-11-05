import { useTypedSelector } from "../hooks/use-typed-selector";
import CellListItem from "./cell-list-item";

const CellList = () => {
	// extract state.cells.order and .data from store, map over each cell id in order array and return the corresponding cells from data
	// cells variable is an array of cells in order
	const cells = useTypedSelector(({ cells: { order, data } }) => order.map((id) => data[id]));
	// map over each cell in cells, and render a CellListItem for each cell
	const renderedCells = cells.map((cell) => <CellListItem key={cell.id} cell={cell} />);
	return <div>{renderedCells}</div>;
};

export default CellList;
