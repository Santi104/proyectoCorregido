import { renderHook, act } from "@testing-library/react";
import { TutelasProvider, useTutelas } from "../../src/context/TutelasContext";

const wrapper = ({ children }: { children: React.ReactNode }) => <TutelasProvider>{children}</TutelasProvider>;

// MU-07 selfAssignTutela() — TutelasContext.tsx · Cobertura de decisión
describe("MU-07 selfAssignTutela()", () => {
  it("CPU-18 tutela t_002 sin responsable -> se asigna a u_abogado", () => {
    const { result } = renderHook(() => useTutelas(), { wrapper });
    act(() => result.current.selfAssignTutela("t_002", "u_abogado"));
    expect(result.current.tutelas.find(t => t.id === "t_002")?.assignedToUserId).toBe("u_abogado");
  });
  it("CPU-19 tutela t_001 asignada a u_eps -> conserva el responsable original", () => {
    const { result } = renderHook(() => useTutelas(), { wrapper });
    act(() => result.current.selfAssignTutela("t_001", "u_abogado"));
    expect(result.current.tutelas.find(t => t.id === "t_001")?.assignedToUserId).toBe("u_eps");
  });
  it("CPU-20 tutela inexistente t_999 -> no modifica ninguna tutela", () => {
    const { result } = renderHook(() => useTutelas(), { wrapper });
    const antes = JSON.stringify(result.current.tutelas);
    act(() => result.current.selfAssignTutela("t_999", "u_abogado"));
    expect(JSON.stringify(result.current.tutelas)).toBe(antes);
  });
});
