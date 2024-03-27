import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/button";
import styles from "./navbar.module.css";

export const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className={styles.main}>
      <div className={styles.logo}>{">"}</div>
      <div>
        {user && (
          <div className={styles.user}>
            <p className="m10r">
              logged in as <b>{user}</b>
            </p>
            <Button onClick={() => navigate("/logout")} text="Log out" />
          </div>
        )}
      </div>
    </div>
  );
};
