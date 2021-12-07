const startingCells = [
	{
		id: "22pq0",
		type: "text",
		content:
			'# JBook\n\nThis is an interactive coding environment. You can write Javascript, see it get executed, and write comprehensive documentation using markdown.\n\n-   Click any text cell to edit it\n-   The code in each code editor is all joined together into one file, if you define a variable in cell #1, you can refer to it in any following cell!\n-   You can require or import modules like you would in a normal javascript file\n-   You can show any string, number, or even React components, or anything else by calling the **_show_** function _eg. show("Hello World")_. This is a function built into this environment. Call show mulitple times to show multiple values\n-   Re-order or delete cells using the buttons in the top right corner of a cell\n-   Add new cells by hovering on the divider between each cell\n\n---\n\nAll of your changes get saved to the file you opened JBook with. So if you ran **_npx jsnote-dan serve test.js_**, all the text and code you write will be saved to the **_test.js_** file\n'
	},
	{
		id: "5wyuc",
		type: "code",
		content:
			'import {useState} from "react";\r\nimport ReactDOM from "react-dom"\r\n\r\nconst Counter = () => {\r\n    const [count, setCount] = useState(0);\r\n    return (\r\n        <div>\r\n            <button onClick={()=> setCount(count + 1)}>Click</button>\r\n            <h3>Count: {count}</h3>\r\n        </div>\r\n    )\r\n}\r\n\r\n// Display any variable or React Component by calling "show()"\r\nshow(<Counter />)\r\n// or do it the React way,\r\n// ReactDOM.render(<Counter />, document.getElementById("root"))'
	}
];

export default startingCells;
