import { Button } from "./button";

export const DeadlineCard = ({ deadline, onEdit, onDelete }) => {
  return (
    <li key={deadline._id}>
      <h2>{deadline.title}</h2>
      <p>
        <progress value={deadline.progress} max="100" />
        <br />
        {deadline.remain} day(s) remaining
      </p>
      <p>
        <b>Assigned: </b>
        {deadline.assignedDate.calendar()}
      </p>
      <p>
        <b>Due: </b>
        {deadline.dueDate.calendar()}
      </p>
      <div>
        <Button text="Edit" onClick={() => onEdit(deadline._id)} />
        <Button text="Delete" onClick={() => onDelete(deadline._id)} />
      </div>
    </li>
  );
};
