import "./resizable.css";
import { useState, useEffect } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";

interface ResizableProps {
	direction: "horizontal" | "vertical";
	children: React.ReactNode;
}

const Resizable = ({ direction, children }: ResizableProps) => {
	const [ innerWidth, setInnerWidth ] = useState(window.innerWidth);
	const [ innerHeight, setInnerHeight ] = useState(window.innerHeight);
	const [ width, setWidth ] = useState(window.innerWidth * 0.75);
	let resizableAttr: ResizableBoxProps;

	useEffect(
		() => {
			// debounce
			let timer: any;
			const listener = () => {
				if (timer) {
					clearTimeout(timer);
				}
				timer = setTimeout(() => {
					// update states with current window width and height
					setInnerWidth(window.innerWidth);
					setInnerHeight(window.innerHeight);
					if (window.innerWidth * 0.75 < width) {
						setWidth(window.innerWidth * 0.75);
					}
				}, 100);
			};
			window.addEventListener("resize", listener);
			// cleanup
			return () => {
				window.removeEventListener("resize", listener);
			};
		},
		[ width ]
	);

	if (direction === "horizontal") {
		resizableAttr = {
			className: "resize-horizontal",
			width,
			height: Infinity,
			resizeHandles: [ "e" ],
			maxConstraints: [ innerWidth * 0.75, Infinity ],
			minConstraints: [ innerWidth * 0.2, Infinity ],
			onResizeStop:
				(event, data) => {
					setWidth(data.size.width);
				}
		};
	} else {
		resizableAttr = {
			width: Infinity,
			height: 400,
			resizeHandles: [ "s" ],
			maxConstraints: [ Infinity, innerHeight * 0.9 ],
			minConstraints: [ Infinity, 100 ]
		};
	}
	return <ResizableBox {...resizableAttr}>{children}</ResizableBox>;
};

export default Resizable;
