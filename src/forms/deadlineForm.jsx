import { useEffect, useState } from "react";
import { Input } from "../components/input/input";
import { Button } from "../components/button/button";
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
      <h1>{deadline.title === "" ? "New deadline" : deadline.title}</h1>
      <Input
        value={deadline.title}
        setValue={(v) => setDeadline({ ...deadline, title: v })}
        label="Title"
      />
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
      <Button text="Back" onClick={() => navigate(-1)} />
      <Button text="Save" onClick={() => onSubmit(deadline)} />
    </div>
  );
};
