import { Dispatch } from "redux";
import { saveCells } from "../action-creators";
import { Action } from "../actions";
import { ActionType } from "../action-types";
import { RootState } from "..";

// a redux middleware provides a point between an action and the momemnt it reaches the reducer
// uses: logging, crash reporting, talking to an async API, routing, etc.

// eg. log every action that happens in the app, together with the state computed after it so that when something goes wrong, we can look back at the log and figure out which action corrupted the state

// dispatch is destructured from store
export const persistMiddleware = ({
	dispatch,
	getState
}: {
	dispatch: Dispatch<Action>;
	getState: () => RootState;
}) => {
	let timer: any;
	return (next: (action: Action) => void) => {
		return (action: Action) => {
			// dispatch action
			next(action);
			// check incoming action to see if we should saveCells()
			if (
				[
					ActionType.MOVE_CELL,
					ActionType.UPDATE_CELL,
					ActionType.INSERT_CELL_AFTER,
					ActionType.DELETE_CELL
				].includes(action.type)
			) {
				if (timer) {
					clearTimeout(timer);
				}
				// debouncing with setTimeout
				timer = setTimeout(() => {
					// have to immediately invoke the function returned from saveCells() as it was used with redux thunk
					saveCells()(dispatch, getState);
				}, 250);
			}
		};
	};
};
