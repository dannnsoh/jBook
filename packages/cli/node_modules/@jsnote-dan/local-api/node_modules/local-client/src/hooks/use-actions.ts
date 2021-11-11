import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";

export const useActions = () => {
	const dispatch = useDispatch();

	// useMemo is used here to only bind the action creators once, if not, in the code cell component, every time useActions is called, it will bind the action creators again resulting in a "different" createBundle which will cause the useEffect hook to run again, causing an infinite loop of the bundling process
	return useMemo(
		() => {
			return bindActionCreators(actionCreators, dispatch);
		},
		[ dispatch ]
	);
};

// bindActionCreators will return a dispatch wrapped function for each action creator so we can just utilise useActions() this way:

// const { updateCell } = useActions()

// updateCell({
//     type: ...,
//     payload: ...
// })
