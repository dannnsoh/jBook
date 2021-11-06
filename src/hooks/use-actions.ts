import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";

export const useActions = () => {
	const dispatch = useDispatch();
	return bindActionCreators(actionCreators, dispatch);
};

// bindActionCreators will return a dispatch wrapped function for each action creator so we can just utilise useActions() this way:

// const { updateCell } = useActions()

// updateCell({
//     type: ...,
//     payload: ...
// })
