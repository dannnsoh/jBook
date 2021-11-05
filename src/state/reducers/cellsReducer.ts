import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";

interface CellsState {
	loading: boolean;
	error: string | null;
	order: string[];
	data: {
		[key: string]: Cell;
	};
}

const initialState: CellsState = {
	loading: false,
	error: null,
	order: [],
	data: {}
};

const reducer = produce((state: CellsState = initialState, action: Action): CellsState => {
	switch (action.type) {
		case ActionType.UPDATE_CELL:
			const { id, content } = action.payload;
			state.data[id].content = content;
			return state;

		case ActionType.DELETE_CELL:
			// delete cell
			delete state.data[action.payload];
			// delete cell id from order array
			state.order = state.order.filter((id) => id !== action.payload);
			return state;

		case ActionType.MOVE_CELL:
			const { direction } = action.payload;
			// index of cell
			const index = state.order.findIndex((id) => id === action.payload.id);
			// new index of cell depending on move direction
			const targetId = direction === "up" ? index - 1 : index + 1;
			// ensure new index is within bounds of order array
			if (targetId < 0 || targetId > state.order.length - 1) {
				return state;
			}
			// swap
			state.order[index] = state.order[targetId];
			state.order[targetId] = action.payload.id;
			return state;

		case ActionType.INSERT_CELL_BEFORE:
			const cell: Cell = {
				id: randomId(),
				type: action.payload.type,
				content: ""
			};
			// insert cell into data array, which contains all the cells and their ids
			state.data[cell.id] = cell;
			// find index of cell to insert before
			const foundIndex = state.order.findIndex((id) => id === action.payload.id);
			// if index is -1 (means no index was found for that id), add cell to end of order array
			if (foundIndex === -1) {
				state.order.push(cell.id);
			} else {
				state.order.splice(foundIndex, 0, cell.id);
			}
			return state;

		default:
			return state;
	}
});

const randomId = () => {
	return Math.random().toString(36).substr(2, 5);
};

export default reducer;
