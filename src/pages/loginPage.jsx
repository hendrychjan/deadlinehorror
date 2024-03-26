import { useAuth } from "../hooks/useAuth";
import { UserForm } from "../forms/userForm";

export const LoginPage = () => {
  const { login } = useAuth();

  const handleLogIn = async (user) => {
    await login(user);
  };

  return (
    <div>
      <h1>Login</h1>
      <hr />
      <UserForm onSubmit={(data) => handleLogIn(data)} />
    </div>
  );
};
