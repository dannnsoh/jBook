import "./action-bar.css";
import { useActions } from "../hooks/use-actions";
import { Button } from "semantic-ui-react";

interface ActionBarProps {
	id: string;
}

const ActionBar = ({ id }: ActionBarProps) => {
	const { moveCell, deleteCell } = useActions();

	return (
		<Button.Group className="action-bar">
			<Button className="action-bar-button" icon="arrow up" onClick={() => moveCell(id, "up")} />
			<Button className="action-bar-button" icon="arrow down" onClick={() => moveCell(id, "down")} />
			<Button className="action-bar-button" icon="trash alternate" onClick={() => deleteCell(id)} />
		</Button.Group>
	);
};

export default ActionBar;
