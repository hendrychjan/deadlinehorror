import { DeadlineCard } from "./deadlineCard";
import moment from "moment";

export const DeadlinesOverview = ({ deadlines, onEdit, onDelete }) => {
  const computeAdditionalFields = (deadline) => {
    const now = new moment();
    const total = new moment.duration(deadline.dueDate.diff(deadline.assignedDate));
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
    <div>
      <p>Count: {deadlines.length}</p>
      <ul>
        {deadlines.map((d) => (
          <DeadlineCard
            key={d._id}
            deadline={{ ...d, ...computeAdditionalFields(d) }}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
};
