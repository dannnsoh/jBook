import "./cell-list.css";
import { useEffect } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import AddCell from "./add-cell";
import CellListItem from "./cell-list-item";
import { useActions } from "../hooks/use-actions";

const CellList = () => {
	// extract state.cells.order and .data from store
	// map over each cell id in order array and return the corresponding cells from data
	// results in cells variable = an array of cells in order

	const cells = useTypedSelector(({ cells: { order, data } }) =>
		order.map(id => data[id])
	);
	const { fetchCells } = useActions();

	useEffect(() => {
		fetchCells();
	}, []);

	const renderedCells = cells.map(cell => {
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
