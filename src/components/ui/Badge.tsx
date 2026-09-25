import React from "react";
import styles from "./Badge.module.scss";

type Tone = "neutral" | "success" | "warning" | "danger" | "info";

type Props = {
  children: React.ReactNode;
  tone?: Tone;
  /** ✅ Compatibilidad: muchas páginas usan `variant` */
  variant?: string;
};

function mapVariantToTone(variant?: string): Tone | undefined {
  if (!variant) return undefined;

  const v = String(variant).toLowerCase();
  // Prioridades típicas
  if (["baja", "low", "info"].includes(v)) return "info";
  if (["media", "medium", "warning"].includes(v)) return "warning";
  if (["alta", "high", "success"].includes(v)) return "success";
  if (["critica", "crítica", "critical", "danger"].includes(v)) return "danger";

  return undefined;
}

export default function Badge({ children, tone, variant }: Props) {
  const finalTone = tone ?? mapVariantToTone(variant) ?? "neutral";

  return (
    <span className={`${styles.badge} ${styles[finalTone] ?? ""}`}>
      {children}
    </span>
  );
}
