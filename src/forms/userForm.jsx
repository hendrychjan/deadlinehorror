import React, { useState } from "react";
import { Input } from "../components/input";
import { Button } from "../components/button";

export const UserForm = ({ onSubmit, initialValue, submitText }) => {
  const defaultValue = { name: "", password: "" };
  const [user, setUser] = useState({ ...defaultValue, ...initialValue });

  return (
    <div>
      <Input
        value={user.name}
        setValue={(v) => setUser({ ...user, name: v })}
        label="Username"
      />
      <br />
      <Input
        value={user.password}
        setValue={(v) => setUser({ ...user, password: v })}
        label="Password"
      />
      <br />
      <Button text={submitText ?? "Log in"} onClick={() => onSubmit(user)} />
    </div>
  );
};
