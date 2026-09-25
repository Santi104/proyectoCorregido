import React, { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

type Variant = "primary" | "outline" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: Props) {
  const v = variant === "dark" ? "primary" : variant;

  return (
    <button
      {...props}
      className={`${styles.btn} ${styles[v]} ${styles[size]} ${className}`}
    />
  );
}
