import { Dispatch } from "react";
import axios from "axios";
import { ActionType } from "../action-types";
import {
	Action,
	Direction,
	UpdateCellAction,
	DeleteCellAction,
	MoveCellAction,
	InsertCellAfterAction
} from "../actions";
import { CellTypes, Cell } from "../cell";
import bundle from "../../bundler";
import { RootState } from "..";

export const updateCell = (id: string, content: string): UpdateCellAction => {
	return {
		type: ActionType.UPDATE_CELL,
		payload:
			{
				id,
				content
			}
	};
};

export const deleteCell = (id: string): DeleteCellAction => {
	return {
		type: ActionType.DELETE_CELL,
		payload: id
	};
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
	return {
		type: ActionType.MOVE_CELL,
		payload:
			{
				id,
				direction
			}
	};
};

export const insertCellAfter = (
	id: string | null,
	cellType: CellTypes
): InsertCellAfterAction => {
	return {
		type: ActionType.INSERT_CELL_AFTER,
		payload:
			{
				id,
				type: cellType
			}
	};
};

export const createBundle = (id: string, input: string) => {
	// utilising redux thunk for async
	// type annotation for dispatch is to make sure we can only call dispatch with a properly typed action object
	return async (dispatch: Dispatch<Action>) => {
		dispatch({
			type: ActionType.BUNDLE_START,
			payload:
				{
					id
				}
		});

		const result = await bundle(input);

		dispatch({
			type: ActionType.BUNDLE_COMPLETE,
			payload:
				{
					id,
					bundle: result
				}
		});
	};
};

export const fetchCells = () => {
	return async (dispatch: Dispatch<Action>) => {
		// only purpose of this action is to flip loading to true
		dispatch({ type: ActionType.FETCH_CELLS });

		try {
			// make request to fetch cells
			const { data }: { data: Cell[] } = await axios.get("/cells");

			dispatch({
				type: ActionType.FETCH_CELLS_COMPLETE,
				payload: data
			});
		} catch (err) {
			if (err instanceof Error) {
				dispatch({
					type: ActionType.FETCH_CELLS_ERROR,
					payload: err.message
				});
			}
		}
	};
};

export const saveCells = () => {
	return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
		// get data and order from current cells state
		const { cells: { data, order } } = getState();
		// derive array of cells in order from data and order array
		const cells = order.map(id => data[id]);
		// make sure request body has an array of cells inside, as defined in createCellsRouter
		try {
			await axios.post("/cells", { cells });
		} catch (err) {
			if (err instanceof Error) {
				dispatch({
					type: ActionType.SAVE_CELLS_ERROR,
					payload: err.message
				});
			}
		}
	};
};
