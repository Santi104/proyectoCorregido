import styles from "./TextArea.module.scss";

export default function TextArea({
  label,
  ...rest
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }) {
  return (
    <label className={styles.wrap}>
      {label ? <div className={styles.label}>{label}</div> : null}
      <textarea className={styles.ta} {...rest} />
    </label>
  );
}
