import styles from "./Input.module.scss";

export default function Input({
  label,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <label className={styles.wrap}>
      {label ? <div className={styles.label}>{label}</div> : null}
      <input className={styles.input} {...rest} />
    </label>
  );
}
