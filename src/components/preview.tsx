import "./preview.css";
import { useRef, useEffect } from "react";

interface PreviewProps {
	code: string;
}

// setup event listener for message and eval the message (bundled code)
// embed this as inner html in iframe using srcdoc attribute
const html = `
    <html>
        <head></head>
        <body>
            <div id="root"></div>
            <script>
                window.addEventListener("message", (event) => {
                    try {
                        eval(event.data);
                    } catch (err) {
                        const root = document.getElementById("root");
                        root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
                        console.error(err);
                    }
                }, false)
            </script>
        </body>
    </html>
`;

const Preview = ({ code }: PreviewProps) => {
	const iframe = useRef<any>();

	useEffect(
		() => {
			// reload iframe to prevent user from deleting html structure
			iframe.current.srcdoc = html;
			// pass bundled code into iframe element via a ref
			iframe.current.contentWindow.postMessage(code, "*");
		},
		[ code ]
	);

	return (
		<div className="preview-wrapper">
			<iframe title="code preview" ref={iframe} sandbox="allow-scripts" srcDoc={html} />
		</div>
	);
};

export default Preview;
