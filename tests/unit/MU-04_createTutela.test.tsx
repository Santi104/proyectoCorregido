import { renderHook, act } from "@testing-library/react";
import { TutelasProvider, useTutelas } from "../../src/context/TutelasContext";

const wrapper = ({ children }: { children: React.ReactNode }) => <TutelasProvider>{children}</TutelasProvider>;

// MU-04 createTutela() — TutelasContext.tsx · Cobertura de sentencias
describe("MU-04 createTutela()", () => {
  it("CPU-13 datos completos (T-2026-002) -> genera ID y fecha, fija RECEPCION y la agrega al inicio", () => {
    const { result } = renderHook(() => useTutelas(), { wrapper });
    const antes = result.current.tutelas.length;
    const inicio = Date.now();
    act(() => result.current.createTutela({
      radicado: "T-2026-002", paciente: "Carlos Pérez", juzgado: "Juzgado 15 Civil Municipal",
      fechaNotificacion: "2026-10-13T00:00:00.000Z", terminoRespuesta: "2026-10-16T00:00:00.000Z",
      servicioSolicitado: "Resonancia magnética", derechoVulnerado: "Salud", prioridad: "ALTA",
      observaciones: "", assignedToUserId: undefined
    }));
    const t = result.current.tutelas[0];
    expect(result.current.tutelas).toHaveLength(antes + 1);
    expect(t.radicado).toBe("T-2026-002");
    expect(t.id).toMatch(/^t_/);
    expect(t.stage).toBe("RECEPCION");
    expect(new Date(t.receivedAt).getTime()).toBeGreaterThanOrEqual(inicio - 1000);
  });
});
