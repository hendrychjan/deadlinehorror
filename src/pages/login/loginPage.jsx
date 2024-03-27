import styles from "./loginPage.module.css";
import { useAuth } from "../../hooks/useAuth";
import { UserForm } from "../../forms/userForm";

export const LoginPage = () => {
  const { login } = useAuth();

  const handleLogIn = async (user) => {
    await login(user);
  };

  return (
    <div className={styles.page}>
      <h1>Login</h1>
      <UserForm onSubmit={(data) => handleLogIn(data)} />
    </div>
  );
};
