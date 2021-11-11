import { useTypedSelector } from "./use-typed-selector";

export const useCumulativeCode = (cellId: string) => {
	return useTypedSelector((state) => {
		// destructure data and order array from state
		const { data, order } = state.cells;
		// map over each cell id from order array and return corresponding cell from data array
		const orderedCells = order.map((id) => data[id]);
		const showFunc = `
        import _React from "react";
        import _ReactDOM from "react-dom";
        var show = (value) => {
            const root = document.getElementById("root");
            if (typeof value === "object") {
                if (value.$$typeof && value.props) {
                    _ReactDOM.render(value, root)
                } else {
                    root.innerHTML = JSON.stringify(value)
                }
            } else {
                root.innerHTML = value;
            }
        };
        `;
		const showFuncNoOp = "var show = () => {}";
		const cumulativeCode = [];
		for (let c of orderedCells) {
			if (c.type === "code") {
				// if the id is the current cell's id, which is the cell that the user wants to execute, then push the usuable show function to cumulativeCode
				if (c.id === cellId) {
					cumulativeCode.push(showFunc);
				} else {
					cumulativeCode.push(showFuncNoOp);
				}
				cumulativeCode.push(c.content);
			}
			if (c.id === cellId) {
				break;
			}
		}
		return cumulativeCode;
	}).join("\n");
};
