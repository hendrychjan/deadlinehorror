import styles from "./homePage.module.css";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "../../components/button/button";

export const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.center}>
        <h1 className={styles.title}>
          {">"}Deadline horror{">"}
        </h1>
      </div>
      <div className={styles.buttons}>
        <Button onClick={() => navigate("/login")} text="Login" />
        <Button onClick={() => navigate("/register")} text="Register" />
      </div>
      <p className={styles.copyright}>
        by{" "}
        <a target="_blank" href="https://github.com/hendrychjan">
          Jan Hendrych
        </a>
      </p>
    </div>
  );
};
