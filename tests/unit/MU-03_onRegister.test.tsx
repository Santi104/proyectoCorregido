import { render, screen, fireEvent } from "@testing-library/react";
import { TutelasProvider } from "../../src/context/TutelasContext";
import RecepcionTutelasPage from "../../src/pages/Recepcion/RecepcionTutelasPage";

const totalTutelas = () => JSON.parse(localStorage.getItem("SG_TUTELAS")!).length;

function llenar(campos: { radicado?: string; paciente?: string; notificacion?: string; termino?: string }) {
  const set = (label: string, value: string) => fireEvent.change(screen.getByLabelText(label), { target: { value } });
  set("Número de Radicado *", campos.radicado ?? "T-2026-001");
  set("Accionante (Paciente) *", campos.paciente ?? "Carlos Pérez");
  set("Fecha de Notificación *", campos.notificacion ?? "2026-10-13");
  set("Término de Respuesta *", campos.termino ?? "2026-10-16");
  fireEvent.click(screen.getByRole("button", { name: "Registrar Tutela" }));
}

// MU-03 onRegister() — RecepcionTutelasPage.tsx · Cobertura de condición
describe("MU-03 onRegister()", () => {
  beforeEach(() => render(<TutelasProvider><RecepcionTutelasPage /></TutelasProvider>));

  it("CPU-08 todos los campos obligatorios completos -> ejecuta createTutela()", () => {
    const antes = totalTutelas();
    llenar({});
    expect(totalTutelas()).toBe(antes + 1);
    expect(JSON.parse(localStorage.getItem("SG_TUTELAS")!)[0].radicado).toBe("T-2026-001");
  });
  it("CPU-09 radicado vacío -> no registra la tutela", () => {
    const antes = totalTutelas();
    llenar({ radicado: "" });
    expect(totalTutelas()).toBe(antes);
  });
  it("CPU-10 paciente vacío -> no registra la tutela", () => {
    const antes = totalTutelas();
    llenar({ paciente: "" });
    expect(totalTutelas()).toBe(antes);
  });
  it("CPU-11 fecha de notificación vacía -> no registra la tutela", () => {
    const antes = totalTutelas();
    llenar({ notificacion: "" });
    expect(totalTutelas()).toBe(antes);
  });
  it("CPU-12 término de respuesta vacío -> no registra la tutela", () => {
    const antes = totalTutelas();
    llenar({ termino: "" });
    expect(totalTutelas()).toBe(antes);
  });
});
