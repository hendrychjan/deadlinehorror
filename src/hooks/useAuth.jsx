import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { createContext, useContext, useMemo } from "react";
import { useApi } from "./useApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();
  const api = useApi();

  const register = async (user) => {
    try {
      const token = await api.userService.register(user);
      api.setAuthToken(token);
      setUser(user.name);
      navigate("/dashboard");
    } catch (error) {
      console.log("Error registering user", error);
    }
  };

  const login = async (user) => {
    try {
      const token = await api.userService.login(user);
      api.setAuthToken(token);
      setUser(user.name);
      navigate("/dashboard");
    } catch (error) {
      console.log("Error logging in", error);
    }
  };

  const logout = () => {
    setUser(null);
    api.setAuthToken(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      register,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
