import "./preview.css";
import { useRef, useEffect } from "react";

interface PreviewProps {
	code: string;
	bundleError: string;
}

// setup event listener for message and eval the message (bundled code)
// embed this as inner html in iframe using srcdoc attribute
const html = `
    <html>
        <head></head>
        <body>
            <div id="root"></div>
            <script>
				const handleError = (err) => {
					const root = document.getElementById("root");
					root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
					console.error(err);
				};
				window.addEventListener("error", (event) => {
					event.preventDefault();
					handleError(event.error);
				});
                window.addEventListener("message", (event) => {
                    try {
                        eval(event.data);
                    } catch (err) {
                        handleError(err);
                    }
                }, false)
            </script>
        </body>
    </html>
`;

const Preview = ({ code, bundleError }: PreviewProps) => {
	const iframe = useRef<any>();

	useEffect(
		() => {
			// update srcdoc of iframe to default state to prevent user from deleting html structure by any chance
			iframe.current.srcdoc = html;
			// slightly delay to allow update of srcdoc first
			setTimeout(() => {
				// pass bundled code into iframe element via a ref
				iframe.current.contentWindow.postMessage(code, "*");
			}, 50);
		},
		[ code ]
	);

	return (
		<div className="preview-wrapper">
			<iframe title="code preview" ref={iframe} sandbox="allow-scripts" srcDoc={html} />
			{bundleError && (
				<div className="preview-error">
					<h3>Compilation Error</h3>
					{bundleError}
				</div>
			)}
		</div>
	);
};

export default Preview;
