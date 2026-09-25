import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";

type Priority = "low" | "medium" | "high" | "critical";

const casos = [
  {
    rad: "T-2024-001234",
    paciente: "Juan Pérez García",
    servicio: "Cirugía de Rodilla",
    prioridad: "high" as Priority,
    estado: "En Análisis",
    asignado: "Dra. María González",
    restante: "3 días",
    progreso: 75,
    tags: ["cirugía", "ortopedia"],
  },
  {
    rad: "T-2024-001235",
    paciente: "María López Ruiz",
    servicio: "Resonancia Magnética",
    prioridad: "medium" as Priority,
    estado: "Pendiente",
    asignado: "—",
    restante: "2 días",
    progreso: 25,
    tags: ["diagnóstico", "neurología"],
  },
];

function toneFromPriority(p: Priority): "neutral" | "success" | "warning" | "danger" | "info" {
  if (p === "critical") return "danger";
  if (p === "high") return "warning";
  if (p === "medium") return "info";
  return "success";
}

function labelFromPriority(p: Priority) {
  if (p === "critical") return "Crítica";
  if (p === "high") return "Alta";
  if (p === "medium") return "Media";
  return "Baja";
}

export default function AnalisisRevisionPage() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16, alignItems: "start" }}>
      <div style={{ display: "grid", gap: 12 }}>
        <Card>
          <div style={{ padding: 14, display: "grid", gap: 10 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <Input placeholder="Buscar por radicado, paciente, servicio..." />
              </div>
              <Button variant="outline">Filtros</Button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
              <Select>
                <option value="">Estado</option>
                <option value="Pendiente">Pendiente</option>
                <option value="En Análisis">En Análisis</option>
                <option value="Completado">Completado</option>
              </Select>

              <Select>
                <option value="">Prioridad</option>
                <option value="Baja">Baja</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
                <option value="Crítica">Crítica</option>
              </Select>

              <Select>
                <option value="">Asignado a</option>
                <option value="Yo">Yo</option>
                <option value="Sin asignar">Sin asignar</option>
                <option value="Todos">Todos</option>
              </Select>

              <Select>
                <option value="">Servicio</option>
                <option value="Cirugía">Cirugía</option>
                <option value="Diagnóstico">Diagnóstico</option>
                <option value="Consulta">Consulta</option>
              </Select>

              <Select>
                <option value="">Fecha</option>
                <option value="Hoy">Hoy</option>
                <option value="Esta semana">Esta semana</option>
                <option value="Este mes">Este mes</option>
              </Select>
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ padding: 14, fontWeight: 900, fontSize: 16 }}>Casos para Análisis</div>

          <div style={{ padding: "0 14px 14px", display: "grid", gap: 12 }}>
            {casos.map((c) => (
              <div
                key={c.rad}
                style={{
                  border: "1px solid #dfe5ee",
                  borderRadius: 12,
                  padding: 14,
                  background: "#f7fafc",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                  <div>
                    <div style={{ fontWeight: 900 }}>{c.rad}</div>
                    <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>{c.paciente}</div>
                  </div>

                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <Badge tone={toneFromPriority(c.prioridad)}>{labelFromPriority(c.prioridad)}</Badge>
                    <Badge tone="neutral">{c.estado}</Badge>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 12 }}>
                  <div>
                    <div style={{ fontSize: 11, color: "#64748b", fontWeight: 800 }}>Servicio Solicitado</div>
                    <div style={{ fontWeight: 900 }}>{c.servicio}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: 11, color: "#64748b", fontWeight: 800 }}>Asignado a</div>
                    <div style={{ fontWeight: 900 }}>{c.asignado}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: 11, color: "#64748b", fontWeight: 800 }}>Tiempo Restante</div>
                    <div style={{ fontWeight: 900 }}>{c.restante}</div>
                  </div>
                </div>

                <div style={{ marginTop: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#64748b", fontWeight: 800 }}>
                    <span>Progreso del Análisis</span>
                    <span>{c.progreso}%</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 99, background: "#e5e7eb", overflow: "hidden", marginTop: 6 }}>
                    <div style={{ width: `${c.progreso}%`, height: "100%", background: "#111214" }} />
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {c.tags.map((t) => (
                      <Badge key={t} tone="neutral">{t}</Badge>
                    ))}
                  </div>

                  <Button variant="primary">Analizar</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <div style={{ padding: 14, fontWeight: 900 }}>Estadísticas de Análisis</div>
        <div style={{ padding: "0 14px 14px", display: "grid", gap: 10 }}>
          {[
            ["Casos Pendientes", "23", "+5 desde ayer"],
            ["En Análisis", "12", "Asignados hoy"],
            ["Completados", "156", "Este mes"],
            ["Críticos", "3", "Requieren atención"],
            ["Analistas Activos", "8", "Trabajando ahora"],
            ["Tiempo Promedio", "2.4 días", "Por análisis"],
          ].map(([t, v, s]) => (
            <div key={t} style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
              <div>
                <div style={{ fontWeight: 900, fontSize: 12 }}>{t}</div>
                <div style={{ fontSize: 11, color: "#64748b", fontWeight: 700 }}>{s}</div>
              </div>
              <div style={{ fontWeight: 900 }}>{v}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
