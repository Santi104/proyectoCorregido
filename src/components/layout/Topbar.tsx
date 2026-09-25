import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Topbar.module.scss";

function subtitleForPath(path: string) {
  if (path.startsWith("/")) {
    if (path === "/") return "Sistema de Gestión de Tutelas";
    if (path.startsWith("/recepcion")) return "Registro y digitalización de nuevas tutelas";
    if (path.startsWith("/contestaciones")) return "Editor de contestaciones con plantillas y argumentos jurídicos";
    if (path.startsWith("/documental")) return "Repositorio centralizado de documentos de tutelas";
    if (path.startsWith("/alertas")) return "Gestión centralizada de alertas críticas y notificaciones";
    if (path.startsWith("/reportes")) return "Análisis integral del desempeño y métricas clave";
    if (path.startsWith("/cumplimiento")) return "Monitoreo en tiempo real de plazos legales y requisitos judiciales";
    if (path.startsWith("/usuarios")) return "Gestión de usuarios y permisos";
  }
  return "Sistema de Gestión de Tutelas";
}

export default function Topbar() {
  const { state } = useAuth();
  const user = state.user!;
  const loc = useLocation();

  return (
    <header className={styles.topbar}>
      <div>
        <div className={styles.welcome}>Bienvenido, {user.fullName}</div>
        <div className={styles.sub}>{user.role === "EPS" ? "Abogado EPS" : user.role === "ADMIN" ? "Administrador" : "EPS Interno"} - {subtitleForPath(loc.pathname)}</div>
      </div>

      <div className={styles.right}>
        <div className={styles.pill}>
          <span className={styles.pillText}>{user.avatarInitials}</span>
        </div>
      </div>
    </header>
  );
}
