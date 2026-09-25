import { useMemo, useState } from "react";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import styles from "./GestionUsuariosPage.module.scss";
import { useUsers } from "../../context/UsersContext";

export default function GestionUsuariosPage() {
  const { users, addUser, setStatus } = useUsers();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"ADMIN" | "EPS" | "ABOGADO">("ABOGADO");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const visible = useMemo(() => users.filter((u) => u.status !== "DELETED"), [users]);

  const onCreate = () => {
    setErr(null);
    const res = addUser({ fullName, email, role, password: password || "demo123" });
    if (!res.ok) return setErr(res.error ?? "No fue posible crear el usuario.");
    setFullName(""); setEmail(""); setPassword("");
  };

  return (
    <div className={styles.page}>
      <div className={styles.title}>Gestión de Usuarios</div>
      <div className={styles.sub}>Crear, congelar o eliminar usuarios (EPS / Admin)</div>

      <div className={styles.grid}>
        <Card className={styles.formCard}>
          <div className={styles.blockTitle}>Nuevo Usuario</div>
          <div className={styles.blockSub}>Complete los campos para crear un usuario</div>

          <div className={styles.form}>
            <Input label="Nombre completo" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <Input label="Correo" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Select label="Rol" value={role} onChange={(e) => setRole(e.target.value as any)}>
              <option value="ABOGADO">Abogado</option>
              <option value="EPS">EPS</option>
              <option value="ADMIN">Admin</option>
            </Select>
            <Input label="Contraseña (demo)" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            {err ? <div className={styles.err}>{err}</div> : null}

            <Button onClick={onCreate}>Crear Usuario</Button>
          </div>
        </Card>

        <Card className={styles.listCard}>
          <div className={styles.blockTitle}>Usuarios</div>
          <div className={styles.table}>
            <div className={styles.thead}>
              <div>Nombre</div>
              <div>Correo</div>
              <div>Rol</div>
              <div>Estado</div>
              <div style={{ textAlign: "right" }}>Acciones</div>
            </div>

            {visible.map((u) => (
              <div key={u.id} className={styles.tr}>
                <div className={styles.nameCell}>
                  <div className={styles.avatar}>{u.avatarInitials}</div>
                  <div className={styles.nameText}>{u.fullName}</div>
                </div>
                <div className={styles.muted}>{u.email}</div>
                <div><Badge tone="info">{u.role}</Badge></div>
                <div>
                  <Badge tone={u.status === "ACTIVE" ? "success" : "warning"}>
                    {u.status === "ACTIVE" ? "Activo" : "Congelado"}
                  </Badge>
                </div>
                <div className={styles.actions}>
                  {u.status === "ACTIVE" ? (
                    <Button size="sm" variant="outline" onClick={() => setStatus(u.id, "FROZEN")}>
                      Congelar
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => setStatus(u.id, "ACTIVE")}>
                      Activar
                    </Button>
                  )}
                  <Button size="sm" variant="outline" onClick={() => setStatus(u.id, "DELETED")}>
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
