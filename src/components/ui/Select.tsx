import React, { SelectHTMLAttributes } from "react";
import styles from "./Select.module.scss";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  /** ✅ para tu uso actual en páginas */
  placeholder?: string;
  options?: string[];
  children?: React.ReactNode;
};

export default function Select({
  label,
  placeholder,
  options,
  children,
  ...props
}: Props) {
  return (
    <label className={styles.wrapper}>
      {label ? <span className={styles.label}>{label}</span> : null}

      <select className={styles.select} {...props}>
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}

        {Array.isArray(options)
          ? options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))
          : children}
      </select>
    </label>
  );
}
