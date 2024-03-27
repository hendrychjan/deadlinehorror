import styles from "./deadlineCard.module.css";
import { Button } from "../../button/button";
import { Progress } from "../../progress";

export const DeadlineCard = ({ deadline, onEdit, onDelete }) => {
  return (
    <div className={styles.card} key={deadline._id}>
      <h2>{deadline.title}</h2>
      <Progress value={deadline.progress} max="100" />
      <p>{deadline.remain} day(s) remaining</p>
      <div>
        <p>
          <b>Assigned: </b>
          {deadline.assignedDate.calendar()}
        </p>
        <p>
          <b>Due: </b>
          {deadline.dueDate.calendar()}
        </p>
      </div>
      <div className={styles.buttons}>
        <Button text="Edit" outlined onClick={() => onEdit(deadline._id)} />
        <Button text="Delete" outlined onClick={() => onDelete(deadline._id)} />
      </div>
    </div>
  );
};
