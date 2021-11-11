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

const reducer = (state: CellsState = initialState, action: Action): CellsState => {
	// draft is a proxy to the original state that can be safely mutated
	return produce(state, draft => {
		switch (action.type) {
			case ActionType.SAVE_CELLS_ERROR:
				draft.error = action.payload;
				return draft;

			case ActionType.FETCH_CELLS:
				draft.loading = true;
				draft.error = null;
				return draft;

			case ActionType.FETCH_CELLS_COMPLETE:
				draft.order = action.payload.map(cell => cell.id);
				draft.data = action.payload.reduce(
					(acc, cell) => {
						// data = { key(cell.id): cell(cell with id, type, content) }
						acc[cell.id] = cell;
						return acc;
					},
					{} as CellsState["data"]
				);
				return draft;

			case ActionType.FETCH_CELLS_ERROR:
				draft.loading = false;
				draft.error = action.payload;
				return draft;

			case ActionType.UPDATE_CELL:
				const { id, content } = action.payload;
				draft.data[id].content = content;
				return draft;

			case ActionType.DELETE_CELL:
				// delete cell
				delete draft.data[action.payload];
				// delete cell id from order array
				draft.order = draft.order.filter(id => id !== action.payload);
				return draft;

			case ActionType.MOVE_CELL:
				const { direction } = action.payload;
				// index of cell
				const index = draft.order.findIndex(id => id === action.payload.id);
				// new index of cell depending on move direction
				const targetId = direction === "up" ? index - 1 : index + 1;
				// ensure new index is within bounds of order array
				if (targetId < 0 || targetId > draft.order.length - 1) {
					return draft;
				}
				// swap
				draft.order[index] = draft.order[targetId];
				draft.order[targetId] = action.payload.id;
				return draft;

			case ActionType.INSERT_CELL_AFTER:
				const cell: Cell = {
					id: randomId(),
					type: action.payload.type,
					content: ""
				};
				// insert cell into data array, which contains all the cells and their ids
				draft.data[cell.id] = cell;
				// find index of cell to insert after
				const foundIndex = draft.order.findIndex(id => id === action.payload.id);
				// if index is -1 (means no index was found for that id), add cell to start of order array
				if (foundIndex === -1) {
					draft.order.unshift(cell.id);
				} else {
					draft.order.splice(foundIndex + 1, 0, cell.id);
				}
				return draft;

			default:
				return draft;
		}
	});
};

const randomId = () => {
	return Math.random().toString(36).substr(2, 5);
};

export default reducer;
