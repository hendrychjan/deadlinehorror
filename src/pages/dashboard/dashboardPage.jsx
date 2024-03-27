import styles from "./dashboardPage.module.css";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import { DeadlinesOverview } from "../../components/deadlines/overview/deadlinesOverview";
import { DeadlineForm } from "../../forms/deadlineForm";
import { useSortedArray } from "../../hooks/useSortedArray";

export const DashboardPage = () => {
  const { deadlineService } = useApi();
  const navigate = useNavigate();

  let deadlines = useSortedArray([], (a, b) => a.dueDate.isAfter(b.dueDate));
  const [selectedDeadline, selectDeadline] = useState(null);

  const handleEditAndCreateDeadline = (id) => {
    if (id === "new") {
      selectDeadline(null);
      navigate("/dashboard/new");
    } else {
      const d = deadlines.items.find((d) => d._id === id);
      selectDeadline(d);
      navigate(`/dashboard/${id}`);
    }
  };

  const handleSaveDeadline = async (data) => {
    if (selectedDeadline) {
      await deadlineService.updateDeadline(data);
      deadlines.update((a) => a._id === selectedDeadline._id, data);
    } else {
      const res = await deadlineService.createDeadline(data);
      deadlines.push({...data, _id: res._id});
    }

    navigate("/dashboard");
  };

  const handleDeleteDeadline = async (id) => {
    await deadlineService.deleteDeadline(id);
    deadlines.remove((d) => d._id === id);
  };

  useEffect(() => {
    const fetchData = async () => {
      const d = await deadlineService.getDeadlines();
      deadlines.pushAll(d);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.page}>
      <Routes>
        <Route
          path="/"
          element={
            <DeadlinesOverview
              deadlines={deadlines.items}
              onEdit={handleEditAndCreateDeadline}
              onDelete={handleDeleteDeadline}
              onCreate={() => handleEditAndCreateDeadline("new")}
            />
          }
        />
        <Route
          path="/:id"
          element={
            <DeadlineForm
              initialValue={selectedDeadline}
              onSubmit={handleSaveDeadline}
            />
          }
        />
      </Routes>
    </div>
  );
};
