import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";

interface BundlesState {
	[key: string]:
		| {
				loading: boolean;
				code: string;
				err: string;
			}
		| undefined; // this is because, initially when a code cell is loaded up, there is no content inside which results in the createBundle action returning bundle as undefined, which in turn results in an error when previewing bundle.code beside the code cell
}

const initialState: BundlesState = {};

const reducer = (state: BundlesState = initialState, action: Action): BundlesState => {
	return produce(state, (draft) => {
		switch (action.type) {
			case ActionType.BUNDLE_START:
				// id of code cell to bundle
				draft[action.payload.id] = {
					loading: true,
					code: "",
					err: ""
				};
				return draft;

			case ActionType.BUNDLE_COMPLETE:
				draft[action.payload.id] = {
					loading: false,
					code: action.payload.bundle.code,
					err: action.payload.bundle.err
				};
				return draft;

			default:
				return draft;
		}
	});
};

export default reducer;
