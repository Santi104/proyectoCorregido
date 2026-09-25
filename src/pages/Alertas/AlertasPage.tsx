import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import styles from "./AlertasPage.module.scss";

type Priority = "low" | "medium" | "high" | "critical";

const alerts = [
  {
    id: "A1",
    title: "Tutela T-2024-001234 vence en 4 horas",
    subtitle:
      "La tutela de Juan Pérez García vence hoy a las 18:00. Requiere contestación inmediata.",
    priority: "critical" as Priority,
    paciente: "Juan Pérez García",
    tiempo: "4 horas",
    radicado: "T-2024-001234",
    recibida: "2024-01-18 14:00",
    actions: ["Ver Caso", "Contestar", "Solicitar Prórroga"],
  },
  {
    id: "A2",
    title: "Incidente de Desacato - T-2024-001156",
    subtitle:
      "Fallo judicial no cumplido. El juzgado ha iniciado incidente de desacato por incumplimiento.",
    priority: "critical" as Priority,
    paciente: "María López Ruiz",
    tiempo: "Vencido hace 2 días",
    radicado: "T-2024-001156",
    recibida: "2024-01-16 09:30",
    actions: ["Ver Expediente", "Justificar Cumplimiento", "Contactar Juzgado"],
  },
  {
    id: "A3",
    title: "Nuevo Fallo Judicial Recibido",
    subtitle:
      "El Juzgado 15 Civil Municipal ha emitido fallo en la tutela T-2024-001298.",
    priority: "high" as Priority,
    paciente: "Carlos Rodríguez",
    tiempo: "Recibido hace 1 hora",
    radicado: "T-2024-001298",
    recibida: "2024-01-18 13:00",
    actions: ["Ver Fallo", "Evaluar Cumplimiento", "Programar Acciones"],
  },
  {
    id: "A4",
    title: "Documentos faltantes",
    subtitle:
      "Historia clínica pendiente para completar análisis de tutela T-2024-001299.",
    priority: "medium" as Priority,
    paciente: "Ana García López",
    tiempo: "Pendiente hace 1 día",
    radicado: "T-2024-001299",
    recibida: "2024-01-17 16:45",
    actions: ["Solicitar Documentos", "Contactar Área Médica", "Ver Caso"],
  },
  {
    id: "A5",
    title: "Recordatorio de seguimiento",
    subtitle: "Caso con actualización pendiente en gestión documental.",
    priority: "low" as Priority,
    paciente: "Pedro Gómez",
    tiempo: "Pendiente hoy",
    radicado: "T-2024-001310",
    recibida: "2024-01-18 08:10",
    actions: ["Ver Caso"],
  },
];

function label(p: Priority) {
  if (p === "critical") return "Crítica";
  if (p === "high") return "Alta";
  if (p === "medium") return "Media";
  return "Baja";
}

function toneFromPriority(p: Priority) {
  if (p === "critical") return "danger";
  if (p === "high") return "warning";
  if (p === "medium") return "info";
  return "success";
}

export default function AlertasPage() {
  return (
    <div className={styles.layout}>
      <div className={styles.main}>
        <div className={styles.headerRow}>
          <div>
            <div className={styles.title}>Centro de Alertas y Notificaciones</div>
            <div className={styles.subtitle}>
              Gestión centralizada de alertas críticas y notificaciones
            </div>
          </div>

          <div className={styles.actionsTop}>
            <Button variant="outline">Configurar Alertas</Button>
            <Button variant="primary">Marcar Todo Leído</Button>
          </div>
        </div>

        <Card>
          <div className={styles.sectionTitle}>
            <span>Alertas</span>
            <Badge tone="danger">4 Activas</Badge>
          </div>

          <div className={styles.list}>
            {alerts.map((a) => (
              <div
                key={a.id}
                className={`${styles.alertCard} ${styles[a.priority]}`}
              >
                <div className={styles.alertTop}>
                  <div className={styles.alertText}>
                    <div className={styles.alertTitle}>
                      {a.title}{" "}
                      <Badge tone={toneFromPriority(a.priority) as any}>
                        {label(a.priority)}
                      </Badge>
                    </div>
                    <div className={styles.alertSub}>{a.subtitle}</div>
                  </div>
                  <button className={styles.close} aria-label="Cerrar">
                    ×
                  </button>
                </div>

                <div className={styles.metaGrid}>
                  <div>
                    <div className={styles.metaLabel}>Paciente:</div>
                    <div className={styles.metaValue}>{a.paciente}</div>
                    <div className={styles.metaLabel}>Tiempo:</div>
                    <div className={styles.metaValue}>{a.tiempo}</div>
                  </div>
                  <div>
                    <div className={styles.metaLabel}>Radicado:</div>
                    <div className={styles.metaValue}>{a.radicado}</div>
                    <div className={styles.metaLabel}>Recibida:</div>
                    <div className={styles.metaValue}>{a.recibida}</div>
                  </div>

                  <div className={styles.btnRow}>
                    {a.actions.map((x, idx) => (
                      <Button
                        key={x}
                        variant={idx === 0 ? "primary" : "ghost"}
                      >
                        {x}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className={styles.side}>
        <Card>
          <div className={styles.sideTitle}>Resumen de Alertas</div>
          <div className={styles.sideStats}>
            <div>
              <span>Críticas</span>
              <b>4</b>
            </div>
            <div>
              <span>Vencimientos Hoy</span>
              <b>8</b>
            </div>
            <div>
              <span>No Leídas</span>
              <b>23</b>
            </div>
            <div>
              <span>Fallos Nuevos</span>
              <b>3</b>
            </div>
            <div>
              <span>Cumplimientos</span>
              <b>12</b>
            </div>
            <div>
              <span>Documentos (OCR)</span>
              <b>5</b>
            </div>
          </div>
        </Card>

        <Card>
          <div className={styles.sideTitle}>Configuración de Alertas</div>
          <div className={styles.toggles}>
            <label>
              <input type="checkbox" defaultChecked /> Notificaciones por Email
            </label>
            <label>
              <input type="checkbox" defaultChecked /> Notificaciones Push
            </label>
            <label>
              <input type="checkbox" /> Alertas Sonoras
            </label>
            <label>
              <input type="checkbox" /> Alertas SMS
            </label>
          </div>
        </Card>
      </div>
    </div>
  );
}
