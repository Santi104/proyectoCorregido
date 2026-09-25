import { useEffect, useState } from "react";
import styles from "./ToastHost.module.scss";

type ToastTone = "info" | "success" | "warning" | "danger";

export type ToastPayload = {
  id: string;
  title: string;
  message?: string;
  tone?: ToastTone;
  ttlMs?: number; // tiempo visible
};

declare global {
  interface Window {
    __SG_TOAST__?: (t: Omit<ToastPayload, "id">) => void;
  }
}

/**
 * ToastHost: contenedor global para notificaciones ligeras.
 * Uso: window.__SG_TOAST__?.({ title: "Guardado", message: "Se guardó el borrador", tone: "success" })
 */
export default function ToastHost() {
  const [toasts, setToasts] = useState<ToastPayload[]>([]);

  useEffect(() => {
    window.__SG_TOAST__ = (t) => {
      const id = `${Date.now()}_${Math.random().toString(16).slice(2)}`;
      const payload: ToastPayload = {
        id,
        title: t.title,
        message: t.message,
        tone: t.tone ?? "info",
        ttlMs: t.ttlMs ?? 2800
      };

      setToasts((prev) => [payload, ...prev].slice(0, 4));

      window.setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.id !== id));
      }, payload.ttlMs);
    };

    return () => {
      delete window.__SG_TOAST__;
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className={styles.host} aria-live="polite" aria-relevant="additions removals">
      {toasts.map((t) => (
        <div key={t.id} className={`${styles.toast} ${styles[t.tone ?? "info"]}`}>
          <div className={styles.top}>
            <div className={styles.title}>{t.title}</div>
            <button
              className={styles.close}
              aria-label="Cerrar notificación"
              onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
            >
              ×
            </button>
          </div>
          {t.message ? <div className={styles.msg}>{t.message}</div> : null}
        </div>
      ))}
    </div>
  );
}
