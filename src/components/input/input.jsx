import styles from "./input.module.css";
import moment from "moment";

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
    <label className={styles.labelPrimary}>
      {label}
      <input
        className={styles.inputPrimary}
        type={type ?? "text"}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </label>
  );
};
