import Card from "../../components/ui/Card";

export default function CumplimientoPage() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ fontSize: 22, fontWeight: 900, color: "#0f172a" }}>Cumplimiento</div>
      <div style={{ color: "#64748b", fontWeight: 600, fontSize: 12 }}>
        Monitoreo en tiempo real de plazos legales y requisitos judiciales
      </div>

      <Card>
        <div style={{ padding: 16 }}>
          <div style={{ fontWeight: 900 }}>En construcción</div>
          <div style={{ marginTop: 6, color: "#64748b", fontWeight: 600, fontSize: 12 }}>
            Aquí va la bandeja de vencimientos, semáforos y alertas.
          </div>
        </div>
      </Card>
    </div>
  );
}
