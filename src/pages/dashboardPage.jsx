import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/button";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { DeadlinesOverview } from "../components/deadlinesOverview";
import { DeadlineForm } from "../forms/deadlineForm";
import { useSortedArray } from "../hooks/useSortedArray";

export const DashboardPage = () => {
  const { user } = useAuth();
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
    <div>
      Logged in as {user}
      <Button onClick={() => navigate("/logout")} text="Logout" />
      <hr />
      <h1>Dashboard</h1>
      <Button onClick={() => handleEditAndCreateDeadline("new")} text="New" />
      <hr />
      <Routes>
        <Route
          path="/"
          element={
            <DeadlinesOverview
              deadlines={deadlines.items}
              onEdit={handleEditAndCreateDeadline}
              onDelete={handleDeleteDeadline}
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
