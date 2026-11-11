import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../../src/context/AuthContext";
import ProtectedRoute from "../../src/router/ProtectedRoute";
import { seedUsers } from "../../src/data/seed";
import type { Role } from "../../src/types/auth";

function renderRuta(role: Role | null) {
  if (role) localStorage.setItem("SG_AUTH", JSON.stringify({ user: seedUsers.find(u => u.role === role) }));
  render(
    <AuthProvider>
      <MemoryRouter initialEntries={["/usuarios"]}>
        <Routes>
          <Route path="/login" element={<div>PANTALLA LOGIN</div>} />
          <Route path="/dashboard" element={<div>PANEL PRINCIPAL</div>} />
          <Route element={<ProtectedRoute allow={["ADMIN", "EPS"]} />}>
            <Route path="/usuarios" element={<div>GESTION USUARIOS</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );
}

// MU-02 ProtectedRoute() — ProtectedRoute.tsx · Cobertura de decisión
describe("MU-02 ProtectedRoute()", () => {
  it("CPU-05 usuario no autenticado -> redirige a inicio de sesión", () => {
    renderRuta(null);
    expect(screen.getByText("PANTALLA LOGIN")).toBeInTheDocument();
  });
  it("CPU-06 usuario ADMIN en ruta ADMIN/EPS -> permite el acceso", () => {
    renderRuta("ADMIN");
    expect(screen.getByText("GESTION USUARIOS")).toBeInTheDocument();
  });
  it("CPU-07 usuario ABOGADO en ruta ADMIN/EPS -> redirige al panel principal", () => {
    renderRuta("ABOGADO");
    expect(screen.getByText("PANEL PRINCIPAL")).toBeInTheDocument();
  });
});
