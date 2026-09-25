import { useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTutelas } from "../../context/TutelasContext";
import Card from "../../components/ui/Card";
import StatCard from "../../components/ui/StatCard";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import styles from "./DashboardPage.module.scss";
import { routes } from "../../router/routes";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const { state } = useAuth();
  const { tutelas } = useTutelas();
  const nav = useNavigate();
  const user = state.user!;

  const metrics = useMemo(() => {
    const assigned = user.role === "ABOGADO" ? tutelas.filter((t) => t.assignedToUserId === user.id).length : 18;
    const pendientes = 5;
    const docsSolic = 12;
    const ganados = 11;
    return { assigned, pendientes, docsSolic, ganados };
  }, [tutelas, user]);

  return (
    <div className={styles.page}>
      <div className={styles.title}>
        Dashboard - {user.role === "ADMIN" ? "ADMIN" : user.role === "EPS" ? "ABOGADO EPS" : "EPS INTERNO"}
      </div>
      <div className={styles.sub}>Bienvenido {user.fullName}, aquí tienes un resumen de tu actividad</div>

      <div className={styles.stats}>
        <StatCard title="Tutelas Asignadas" value={metrics.assigned} iconTone="info" />
        <StatCard title="Contestaciones Pendientes" value={metrics.pendientes} iconTone="warning" />
        <StatCard title="Documentos Solicitados" value={metrics.docsSolic} iconTone="info" />
        <StatCard title="Casos Ganados" value={metrics.ganados} iconTone="success" />
      </div>

      <Card className={styles.quick}>
        <div className={styles.blockTitle}>Acciones Rápidas</div>
        <div className={styles.blockSub}>Funciones principales para tu rol</div>

        <div className={styles.quickGrid}>
          <button className={styles.quickBtn} onClick={() => nav(routes.recepcion)}>
            <div className={styles.quickIcon} />
            <div className={styles.quickText}>Analizar Casos</div>
          </button>
          <button className={styles.quickBtn} onClick={() => nav(routes.contestaciones)}>
            <div className={styles.quickIcon} />
            <div className={styles.quickText}>Redactar Contestación</div>
          </button>
          <button className={styles.quickBtn} onClick={() => nav(routes.documental)}>
            <div className={styles.quickIcon} />
            <div className={styles.quickText}>Solicitar Documentos</div>
          </button>
        </div>
      </Card>

      <Card className={styles.alerts}>
        <div className={styles.blockTitle}>Alertas Recientes</div>

        <div className={styles.alertRowDanger}>
          <div>
            <div className={styles.alertTitle}>Tutela próxima a vencer</div>
            <div className={styles.alertSub}>Radicado 2024-001 vence en 2 horas</div>
          </div>
          <Badge tone="danger">Crítico</Badge>
        </div>

        <div className={styles.alertRowWarn}>
          <div>
            <div className={styles.alertTitle}>Nueva tutela recibida</div>
            <div className={styles.alertSub}>Radicado 2024-045 requiere análisis</div>
          </div>
          <Badge tone="neutral">Pendiente</Badge>
        </div>

        <div className={styles.alertActions}>
          <Button variant="outline" onClick={() => nav(routes.alertas)}>Ver Centro de Alertas</Button>
          <Button onClick={() => nav(routes.reportes)}>Ver Reportes</Button>
        </div>
      </Card>
    </div>
  );
}
