import "./add-cell.css";
import { useActions } from "../hooks/use-actions";
import { Button, Icon, Divider } from "semantic-ui-react";

interface AddCellProps {
	previousCellId: string | null;
	forceVisible?: boolean;
}

const AddCell = ({ previousCellId, forceVisible }: AddCellProps) => {
	const { insertCellAfter } = useActions();

	return (
		<Divider horizontal section>
			<Button.Group className={`add-cell ${forceVisible ? "force-visible" : ""}`} compact>
				<Button
					animated="fade"
					className="add-cell-button"
					onClick={() => insertCellAfter(previousCellId, "code")}
				>
					<Button.Content visible>Code</Button.Content>
					<Button.Content hidden>
						<Icon name="add" />
					</Button.Content>
				</Button>
				<Button
					animated="fade"
					className="add-cell-button"
					onClick={() => insertCellAfter(previousCellId, "text")}
				>
					<Button.Content visible>Text</Button.Content>
					<Button.Content hidden>
						<Icon name="add" />
					</Button.Content>
				</Button>
			</Button.Group>
		</Divider>
	);
};

export default AddCell;
