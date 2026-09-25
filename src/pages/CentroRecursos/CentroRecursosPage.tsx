import Card from "../../components/ui/Card";

export default function CentroRecursosPage() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ fontSize: 22, fontWeight: 900, color: "#0f172a" }}>
        Centro de Recursos
      </div>
      <div style={{ color: "#64748b", fontWeight: 600, fontSize: 12 }}>
        Documentación, plantillas, guías y soporte
      </div>

      <Card>
        <div style={{ padding: 16 }}>
          <div style={{ fontWeight: 900 }}>En construcción</div>
          <div style={{ marginTop: 6, color: "#64748b", fontWeight: 600, fontSize: 12 }}>
            Aquí van plantillas, jurisprudencia, guías y FAQs.
          </div>
        </div>
      </Card>
    </div>
  );
}
