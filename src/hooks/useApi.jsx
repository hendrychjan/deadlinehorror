import { createContext, useContext, useMemo } from "react";
import axios from "axios";
import { UserService } from "../services/api/userService";
import { useLocalStorage } from "./useLocalStorage";
import { DeadlineService } from "../services/api/deadlineService";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [authToken, saveAuthToken] = useLocalStorage("authToken", null);

  axios.defaults.headers.Pragma = "no-cache";

  let api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": authToken,
    },
  });

  const setAuthToken = (token) => {
    saveAuthToken(token);
  };

  const userService = new UserService(api);
  const deadlineService = new DeadlineService(api);

  const value = useMemo(
    () => ({
      setAuthToken,
      userService,
      deadlineService,
    }),
    [authToken]
  );

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
  return useContext(ApiContext);
};
