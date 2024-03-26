export const Progress = ({ label, value, max }) => {
  return (
    <>
      {label && <label>{label}</label>}
      <progress value={value} max={max} />
    </>
  );
};
