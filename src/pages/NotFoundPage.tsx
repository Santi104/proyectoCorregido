import { Link } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { routes } from "../router/routes";

export default function NotFoundPage() {
  return (
    <div style={{ padding: 22 }}>
      <Card style={{ padding: 18, maxWidth: 560 }}>
        <div style={{ fontWeight: 900, fontSize: 18 }}>404 - Página no encontrada</div>
        <div style={{ marginTop: 6, color: "#64748b", fontWeight: 600, fontSize: 13 }}>
          La ruta que intentas abrir no existe o fue movida.
        </div>

        <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
          <Link to={routes.dashboard} style={{ textDecoration: "none" }}>
            <Button>Ir al Dashboard</Button>
          </Link>
          <Link to={routes.login} style={{ textDecoration: "none" }}>
            <Button variant="outline">Login</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
