import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import styles from "./LoginPage.module.scss";

const demoUsers = [
  { label: "Admin Sistema", email: "admin@saludguard.com", desc: "Administrador - admin@saludguard.com", pass: "admin123" },
  { label: "Dra. María González", email: "abogado@eps.com", desc: "Abogado EPS - abogado@eps.com", pass: "eps123" },
  { label: "Ana Rodríguez", email: "eps@interno.com", desc: "EPS Interno - eps@interno.com", pass: "abogado123" }
];

export default function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("abogado@eps.com");
  const [password, setPassword] = useState("eps123");
  const [error, setError] = useState<string | null>(null);

  const subtitle = useMemo(() => "Sistema de Gestión de Tutelas en Salud", []);

  const onSubmit = () => {
    setError(null);
    const res = login(email, password);
    if (!res.ok) {
      setError(res.error ?? "Error");
      return;
    }
    nav("/");
  };

  return (
    <div className={styles.page}>
      <div className={styles.center}>
        <div className={styles.brand}>
          <div className={styles.brandTitle}>SaludGuard</div>
          <div className={styles.brandSub}>{subtitle}</div>
        </div>

        <Card className={styles.loginCard}>
          <div className={styles.cardTitle}>Iniciar Sesión</div>
          <div className={styles.cardSub}>Ingrese sus credenciales para acceder al sistema</div>

          <label className={styles.field}>
            <div className={styles.label}>Correo Electrónico</div>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} />
          </label>

          <label className={styles.field}>
            <div className={styles.label}>Contraseña</div>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} />
          </label>

          {error ? <div className={styles.error}>{error}</div> : null}

          <Button onClick={onSubmit} className={styles.fullBtn}>
            Iniciar Sesión
          </Button>
        </Card>

        <Card className={styles.demoCard}>
          <div className={styles.cardTitle}>Usuarios de Demostración</div>
          <div className={styles.cardSub}>Haga clic para usar credenciales de prueba</div>

          <div className={styles.demoList}>
            {demoUsers.map((u) => (
              <button
                key={u.email}
                className={styles.demoItem}
                onClick={() => {
                  setEmail(u.email);
                  setPassword(u.pass);
                  setError(null);
                }}
              >
                <div className={styles.demoLabel}>{u.label}</div>
                <div className={styles.demoDesc}>{u.desc}</div>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
