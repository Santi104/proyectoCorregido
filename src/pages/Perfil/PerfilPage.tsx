import { useMemo, useState } from "react";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import styles from "./PerfilPage.module.scss";

type SGUser = {
  id?: number;
  name?: string;
  email?: string;
  role?: string;
};

function safeParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function getUserFromStorage(): SGUser {
  // Ajusta las keys si en tu app usas otras
  const fromProfile = safeParse<SGUser>(localStorage.getItem("sg_profile"));
  const fromAuth = safeParse<{ user?: SGUser } | SGUser>(localStorage.getItem("sg_auth"));

  const authUser =
    (fromAuth && "user" in (fromAuth as any) ? (fromAuth as any).user : fromAuth) as SGUser | null;

  return {
    id: authUser?.id ?? fromProfile?.id ?? 3,
    name: authUser?.name ?? fromProfile?.name ?? "Dra. María González",
    email: authUser?.email ?? fromProfile?.email ?? "abogado@eps.com",
    role: authUser?.role ?? fromProfile?.role ?? "ABOGADO_EPS",
  };
}

function roleLabel(role?: string) {
  const r = (role || "").toUpperCase();
  if (r === "ADMIN") return "Administrador";
  if (r === "EPS") return "Abogado EPS";
  if (r === "ABOGADO_EPS") return "Abogado EPS";
  if (r === "ABOGADO") return "Abogado";
  return role || "Usuario";
}

export default function PerfilPage() {
  const initialUser = useMemo(() => getUserFromStorage(), []);
  const [fullName, setFullName] = useState(initialUser.name ?? "");
  const [email, setEmail] = useState(initialUser.email ?? "");

  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const permissions = useMemo(() => {
    const base = [
      "tutelas: recibir",
      "tutelas: analizar",
      "tutelas: contestar",
      "documentos: gestionar",
      "reportes: ver",
      "recursos: consultar",
    ];

    // ✅ Abogados NO pueden gestionar usuarios ni asignar tutelas
    const r = (initialUser.role || "").toUpperCase();
    if (r === "ADMIN" || r === "EPS") {
      base.push("usuarios: gestionar", "tutelas: asignar");
    }

    return base;
  }, [initialUser.role]);

  function onUpdateProfile() {
    localStorage.setItem(
      "sg_profile",
      JSON.stringify({
        id: initialUser.id ?? 3,
        role: initialUser.role ?? "ABOGADO_EPS",
        name: fullName,
        email,
      })
    );
  }

  function onChangePassword() {
    if (!currentPass || !newPass || newPass !== confirmPass) return;
    setCurrentPass("");
    setNewPass("");
    setConfirmPass("");
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Mi Perfil</h1>
        <p>Gestiona tu información personal y configuración de cuenta</p>
      </div>

      <div className={styles.grid}>
        <Card className={styles.card}>
          <div className={styles.cardTitle}>
            <h3>Información Personal</h3>
            <p>Actualiza tu información básica</p>
          </div>

          <div className={styles.form}>
            <Input
              label="Nombre Completo"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Input
              label="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input label="Rol" value={roleLabel(initialUser.role)} readOnly />
            <Input label="ID de Usuario" value={String(initialUser.id ?? 3)} readOnly />

            <div className={styles.actions}>
              <Button variant="primary" onClick={onUpdateProfile}>
                Actualizar Perfil
              </Button>
            </div>
          </div>
        </Card>

        <Card className={styles.card}>
          <div className={styles.cardTitle}>
            <h3>Cambiar Contraseña</h3>
            <p>Actualiza tu contraseña de acceso</p>
          </div>

          <div className={styles.form}>
            <Input
              label="Contraseña Actual"
              type="password"
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
            />
            <Input
              label="Nueva Contraseña"
              type="password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
            <Input
              label="Confirmar Nueva Contraseña"
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />

            <div className={styles.actions}>
              <Button variant="primary" onClick={onChangePassword}>
                Cambiar Contraseña
              </Button>
            </div>
          </div>
        </Card>

        <Card className={styles.perms}>
          <div className={styles.cardTitle}>
            <h3>Permisos del Usuario</h3>
            <p>Permisos asignados a tu rol</p>
          </div>

          <ul className={styles.permList}>
            {permissions.map((p) => (
              <li key={p}>
                <span className={styles.check}>✓</span> {p}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
