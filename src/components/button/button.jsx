import styles from "./button.module.css";

export const Button = ({ text, onClick, outlined }) => {
  let classes = `${styles.base} ${(outlined) ? styles.outlined : styles.elevated}`;

  return (
    <button className={classes} onClick={onClick}>
      {text}
    </button>
  );
};
