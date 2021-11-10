import "./cell-list.css";
import { useTypedSelector } from "../hooks/use-typed-selector";
import AddCell from "./add-cell";
import CellListItem from "./cell-list-item";

const CellList = () => {
	// extract state.cells.order and .data from store
	// map over each cell id in order array and return the corresponding cells from data
	// cells variable is an array of cells in order
	const cells = useTypedSelector(({ cells: { order, data } }) => order.map((id) => data[id]));
	// map over each cell in cells, and render a CellListItem for each cell
	const renderedCells = cells.map((cell) => {
		return (
			<div key={cell.id}>
				<CellListItem cell={cell} />
				<AddCell previousCellId={cell.id} />
			</div>
		);
	});

	return (
		<div className="cell-list">
			<AddCell forceVisible={cells.length === 0} previousCellId={null} />
			{renderedCells}
		</div>
	);
};

export default CellList;
