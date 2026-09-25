import Card from "../../components/ui/Card";

export default function ReportesPage() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ fontSize: 22, fontWeight: 900, color: "#0f172a" }}>Reportes</div>
      <div style={{ color: "#64748b", fontWeight: 600, fontSize: 12 }}>
        Análisis integral del desempeño y métricas clave
      </div>

      <Card>
        <div style={{ padding: 16 }}>
          <div style={{ fontWeight: 900 }}>En construcción</div>
          <div style={{ marginTop: 6, color: "#64748b", fontWeight: 600, fontSize: 12 }}>
            Aquí van KPIs, filtros y exportación.
          </div>
        </div>
      </Card>
    </div>
  );
}
