import { useEffect, useState } from "react";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export const DeadlineForm = ({ onSubmit, initialValue }) => {
  const navigate = useNavigate();

  const [deadline, setDeadline] = useState({
    title: "",
    assignedDate: new moment().startOf("day"),
    dueDate: new moment().endOf("day"),
    ...initialValue,
  });

  return (
    <div>
      <Input
        value={deadline.title}
        setValue={(v) => setDeadline({ ...deadline, title: v })}
        label="Title"
      />
      <br />
      <Input
        // value={deadline.assignedDate.toISOString().substring(0, 10)}
        value={deadline.assignedDate.format("YYYY-MM-DD")}
        type="date"
        setValue={(v) =>
          setDeadline({
            ...deadline,
            assignedDate: v,
          })
        }
        label="Assigned Date"
      />
      <br />
      <Input
        value={deadline.dueDate.format("YYYY-MM-DD")}
        type="date"
        setValue={(v) => {
          v.endOf("day");
          setDeadline({
            ...deadline,
            dueDate: v,
          });
        }}
        label="Due Date"
      />
      <br />
      <Button text="Back" onClick={() => navigate(-1)} />
      <Button text="Save" onClick={() => onSubmit(deadline)} />
    </div>
  );
};
