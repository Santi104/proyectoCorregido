import { useMemo, useState } from "react";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import TextArea from "../../components/ui/TextArea";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import styles from "./RecepcionTutelasPage.module.scss";
import { useTutelas } from "../../context/TutelasContext";

export default function RecepcionTutelasPage() {
  const { createTutela, tutelas } = useTutelas();

  const [radicado, setRadicado] = useState("T-2024-001234");
  const [paciente, setPaciente] = useState("");
  const [juzgado, setJuzgado] = useState("");
  const [fechaNot, setFechaNot] = useState("");
  const [termino, setTermino] = useState("");
  const [servicio, setServicio] = useState("");
  const [derecho, setDerecho] = useState("");
  const [prioridad, setPrioridad] = useState<"MEDIA" | "ALTA" | "BAJA" | "CRITICA">("MEDIA");
  const [obs, setObs] = useState("");

  const recent = useMemo(() => tutelas.slice(0, 3), [tutelas]);

  const onRegister = () => {
    if (!radicado.trim() || !paciente.trim() || !fechaNot || !termino) return;

    createTutela({
      radicado,
      paciente,
      juzgado: juzgado || "Seleccionar juzgado",
      fechaNotificacion: new Date(fechaNot).toISOString(),
      terminoRespuesta: new Date(termino).toISOString(),
      servicioSolicitado: servicio || "—",
      derechoVulnerado: derecho || "—",
      prioridad,
      observaciones: obs,
      assignedToUserId: undefined
    });

    // limpiar lo sensible
    setPaciente("");
    setServicio("");
    setObs("");
  };

  return (
    <div className={styles.page}>
      <div className={styles.headerRow}>
        <div>
          <div className={styles.title}>Recepción de Tutelas</div>
          <div className={styles.sub}>Registro y digitalización de nuevas tutelas</div>
        </div>
        <div className={styles.headerActions}>
          <Button variant="outline">Escanear OCR</Button>
          <Button>Nueva Tutela</Button>
        </div>
      </div>

      <div className={styles.grid}>
        <Card className={styles.formCard}>
          <div className={styles.blockTitle}>Registro de Nueva Tutela</div>
          <div className={styles.blockSub}>Complete todos los campos obligatorios</div>

          <div className={styles.sectionTitle}>Información Básica</div>
          <div className={styles.formGrid}>
            <Input label="Número de Radicado *" value={radicado} onChange={(e) => setRadicado(e.target.value)} />
            <Select label="Juzgado *" value={juzgado} onChange={(e) => setJuzgado(e.target.value)}>
              <option value="">Seleccionar juzgado</option>
              <option>Juzgado 15 Civil Municipal</option>
              <option>Juzgado 8 Civil del Circuito</option>
              <option>Juzgado 22 Civil Municipal</option>
            </Select>

            <Input label="Accionante (Paciente) *" value={paciente} onChange={(e) => setPaciente(e.target.value)} placeholder="Nombre completo del paciente" />
            <div className={styles.twoCols}>
              <Input label="Fecha de Notificación *" type="date" value={fechaNot} onChange={(e) => setFechaNot(e.target.value)} />
              <Input label="Término de Respuesta *" type="date" value={termino} onChange={(e) => setTermino(e.target.value)} />
            </div>
          </div>

          <div className={styles.sectionTitle}>Detalles de la Tutela</div>
          <div className={styles.formGrid}>
            <Input label="Servicio Solicitado *" value={servicio} onChange={(e) => setServicio(e.target.value)} placeholder="Ej: Cirugía de rodilla, Resonancia magnética, etc." />

            <Select label="Derecho Vulnerado" value={derecho} onChange={(e) => setDerecho(e.target.value)}>
              <option value="">Seleccionar derecho vulnerado</option>
              <option>Salud</option>
              <option>Vida digna</option>
              <option>Seguridad social</option>
              <option>Debido proceso</option>
            </Select>

            <Select label="Prioridad" value={prioridad} onChange={(e) => setPrioridad(e.target.value as any)}>
              <option value="BAJA">Baja</option>
              <option value="MEDIA">Media</option>
              <option value="ALTA">Alta</option>
              <option value="CRITICA">Crítica</option>
            </Select>

            <TextArea label="Observaciones" value={obs} onChange={(e) => setObs(e.target.value)} placeholder="Observaciones adicionales sobre la tutela..." />
          </div>

          <div className={styles.sectionTitle}>Documentos</div>
          <div className={styles.dropzone}>
            <div className={styles.dzIcon}>⬆</div>
            <div className={styles.dzText}>Arrastra y suelta archivos aquí, o haz clic para seleccionar</div>
            <div className={styles.dzSub}>Formatos soportados: PDF, JPG, PNG, DOC, DOCX (máx. 10MB por archivo)</div>
            <div className={styles.dzActions}>
              <Button variant="outline" size="sm">Seleccionar Archivos</Button>
              <Button variant="outline" size="sm">Escanear OCR</Button>
            </div>
          </div>

          <div className={styles.footerActions}>
            <Button variant="outline">Guardar Borrador</Button>
            <Button onClick={onRegister}>Registrar Tutela</Button>
          </div>
        </Card>

        <div className={styles.rightCol}>
          <Card className={styles.statsCard}>
            <div className={styles.blockTitle}>Estadísticas de Registro</div>
            <div className={styles.statsList}>
              <div className={styles.statRow}>
                <div className={styles.statLabel}>Registradas Hoy</div>
                <div className={styles.statValue}>8</div>
              </div>
              <div className={styles.statRow}>
                <div className={styles.statLabel}>Tiempo Promedio</div>
                <div className={styles.statValue}>4.2 min</div>
              </div>
              <div className={styles.statRow}>
                <div className={styles.statLabel}>Esta Semana</div>
                <div className={styles.statValue}>47</div>
              </div>
              <div className={styles.statRow}>
                <div className={styles.statLabel}>Pendientes OCR</div>
                <div className={styles.statValue}>3</div>
              </div>
            </div>
          </Card>

          <Card className={styles.recentCard}>
            <div className={styles.recentTop}>
              <div className={styles.blockTitle}>Registros Recientes</div>
              <Badge tone="neutral">Hoy: {recent.length}</Badge>
            </div>

            <div className={styles.recentList}>
              {recent.map((t) => (
                <div key={t.id} className={styles.recentItem}>
                  <div className={styles.recentMeta}>
                    <div className={styles.recentRad}>{t.radicado}</div>
                    <div className={styles.recentName}>{t.paciente || "—"}</div>
                    <div className={styles.recentSvc}>{t.servicioSolicitado}</div>
                  </div>
                  <Badge tone={t.prioridad === "CRITICA" ? "danger" : t.prioridad === "ALTA" ? "warning" : "neutral"}>
                    {t.prioridad === "CRITICA" ? "Crítica" : t.prioridad === "ALTA" ? "Alta" : "Media"}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
