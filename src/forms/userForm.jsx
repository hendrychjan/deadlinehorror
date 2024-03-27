import React, { useState } from "react";
import { Input } from "../components/input/input";
import { Button } from "../components/button/button";

export const UserForm = ({ onSubmit, initialValue, submitText }) => {
  const defaultValue = { name: "", password: "" };
  const [user, setUser] = useState({ ...defaultValue, ...initialValue });

  return (
    <div className="form">
      <Input
        value={user.name}
        setValue={(v) => setUser({ ...user, name: v })}
        label="Username"
      />
      <Input
        value={user.password}
        setValue={(v) => setUser({ ...user, password: v })}
        type="password"
        label="Password"
      />
      <Button text={submitText ?? "Log in"} onClick={() => onSubmit(user)} />
    </div>
  );
};
