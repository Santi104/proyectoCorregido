import Card from "../../components/ui/Card";

export default function ContestacionesPage() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ fontSize: 22, fontWeight: 900, color: "#0f172a" }}>Contestaciones</div>
      <div style={{ color: "#64748b", fontWeight: 600, fontSize: 12 }}>
        Editor de contestaciones con plantillas y argumentos jurídicos
      </div>

      <Card className="">
        <div style={{ padding: 16 }}>
          <div style={{ fontWeight: 900 }}>En construcción</div>
          <div style={{ marginTop: 6, color: "#64748b", fontWeight: 600, fontSize: 12 }}>
            Esta vista está lista para que conectemos plantillas, editor y exportación.
          </div>
        </div>
      </Card>
    </div>
  );
}
