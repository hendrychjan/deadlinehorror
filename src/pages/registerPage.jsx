import { UserForm } from "../forms/userForm";
import { useAuth } from "../hooks/useAuth";

export const RegisterPage = () => {
  const { register } = useAuth();

  const handleRegister = async (user) => {
    await register(user);
  };

  return (
    <div>
      <h1>Register</h1>
      <hr />
      <UserForm
        submitText="Register"
        onSubmit={(data) => handleRegister(data)}
      />
    </div>
  );
};
