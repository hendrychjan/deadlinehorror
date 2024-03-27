import styles from "./registerPage.module.css";
import { UserForm } from "../../forms/userForm";
import { useAuth } from "../../hooks/useAuth";

export const RegisterPage = () => {
  const { register } = useAuth();

  const handleRegister = async (user) => {
    await register(user);
  };

  return (
    <div className={styles.page}>
      <h1>Register</h1>
      <UserForm
        submitText="Register"
        onSubmit={(data) => handleRegister(data)}
      />
    </div>
  );
};
