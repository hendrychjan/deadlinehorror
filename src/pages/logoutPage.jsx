import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

export const LogoutPage = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, []);

  return (
    <div>
      <h1>Logout</h1>
    </div>
  );
};
