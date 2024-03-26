import moment from "moment";
import { useState } from "react";

export const Input = ({ value, setValue, type, placeholder, label }) => {
  const handleChange = (e) => {
    let value = e.target.value;

    if (type === "date") {
      if (value === "") return;

      value = new moment(value, "YYYY-MM-DD");
    }

    setValue(value);
  };

  return (
    <label>
      {label}
      <input
        type={type ?? "text"}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </label>
  );
};
