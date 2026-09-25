import Card from "../../components/ui/Card";

export default function GestionDocumentalPage() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ fontSize: 22, fontWeight: 900, color: "#0f172a" }}>Gestión Documental</div>
      <div style={{ color: "#64748b", fontWeight: 600, fontSize: 12 }}>
        Repositorio centralizado de documentos de tutelas
      </div>

      <Card>
        <div style={{ padding: 16 }}>
          <div style={{ fontWeight: 900 }}>En construcción</div>
          <div style={{ marginTop: 6, color: "#64748b", fontWeight: 600, fontSize: 12 }}>
            Aquí va el buscador, la tabla de documentos y los paneles laterales.
          </div>
        </div>
      </Card>
    </div>
  );
}
