import "./resizable.css";
import { ResizableBox, ResizableBoxProps } from "react-resizable";

interface ResizableProps {
	direction: "horizontal" | "vertical";
	children: React.ReactNode;
}

const Resizable = ({ direction, children }: ResizableProps) => {
	let resizableAttr: ResizableBoxProps;

	if (direction === "horizontal") {
		resizableAttr = {
			className: "resize-horizontal",
			width: window.innerWidth * 0.75,
			height: Infinity,
			resizeHandles: [ "e" ],
			maxConstraints: [ window.innerWidth * 0.75, Infinity ],
			minConstraints: [ window.innerWidth * 0.2, Infinity ]
		};
	} else {
		resizableAttr = {
			width: Infinity,
			height: 400,
			resizeHandles: [ "s" ],
			maxConstraints: [ Infinity, window.innerHeight * 0.9 ],
			minConstraints: [ Infinity, 100 ]
		};
	}

	return <ResizableBox {...resizableAttr}>{children}</ResizableBox>;
};

export default Resizable;
