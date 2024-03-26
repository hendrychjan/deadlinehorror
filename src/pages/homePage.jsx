import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";

export const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      {user && (
        <Button onClick={() => navigate("/dashboard")} text="Dashboard" />
      )}
      {!user && (
        <>
          <Button onClick={() => navigate("/login")} text="Login" />
          <Button onClick={() => navigate("/register")} text="Register" />
        </>
      )}
      <hr />
      <h1>Home</h1>
    </div>
  );
};
