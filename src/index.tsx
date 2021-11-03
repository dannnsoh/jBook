import "semantic-ui-css/semantic.min.css";
import "./index.css";
import ReactDOM from "react-dom";
import CodeCell from "./components/code-cell";

const App = () => {
	return (
		<div>
			<CodeCell />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
