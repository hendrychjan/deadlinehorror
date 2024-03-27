import styles from "./deadlinesOverview.module.css";
import { DeadlineCard } from "../card/deadlineCard";
import { Button } from "../../button/button";
import moment from "moment";

export const DeadlinesOverview = ({
  deadlines,
  onEdit,
  onDelete,
  onCreate,
}) => {
  const computeAdditionalFields = (deadline) => {
    const now = new moment();
    const total = new moment.duration(
      deadline.dueDate.diff(deadline.assignedDate)
    );
    let passed = new moment.duration(now.diff(deadline.assignedDate));
    let remain = new moment.duration(deadline.dueDate.diff(now));
    let progress = (passed.asHours() / total.asHours()) * 100;
    if (progress > 100) progress = 100;
    return {
      progress,
      total: total.asHours(),
      passed: Math.ceil(new moment.duration(passed.toString()).asDays()),
      remain: Math.ceil(new moment.duration(remain.toString()).asDays()),
    };
  };

  return (
    <>
      <Button onClick={onCreate} text="New" />
      <p style={{ color: deadlines.length ? "red" : "rgb(var(--primary))" }}>
        {deadlines.length} to do{deadlines.length ? `, nearest ${deadlines[0].dueDate.calendar()}` : ""}
      </p>
      <div className={styles.cards}>
        {deadlines.map((d) => (
          <DeadlineCard
            key={d._id}
            deadline={{ ...d, ...computeAdditionalFields(d) }}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </>
  );
};
