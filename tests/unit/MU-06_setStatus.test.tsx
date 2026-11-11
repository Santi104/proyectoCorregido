import { renderHook, act } from "@testing-library/react";
import { UsersProvider, useUsers } from "../../src/context/UsersContext";

const wrapper = ({ children }: { children: React.ReactNode }) => <UsersProvider>{children}</UsersProvider>;

// MU-06 setStatus() — UsersContext.tsx · Cobertura de decisión
describe("MU-06 setStatus()", () => {
  it("CPU-16 ID existente u_admin, estado FROZEN -> actualiza ese usuario", () => {
    const { result } = renderHook(() => useUsers(), { wrapper });
    act(() => result.current.setStatus("u_admin", "FROZEN"));
    expect(result.current.users.find(u => u.id === "u_admin")?.status).toBe("FROZEN");
    expect(result.current.users.filter(u => u.status === "FROZEN")).toHaveLength(1);
  });
  it("CPU-17 ID inexistente u_999 -> no modifica ningún usuario", () => {
    const { result } = renderHook(() => useUsers(), { wrapper });
    const antes = JSON.stringify(result.current.users);
    act(() => result.current.setStatus("u_999", "FROZEN"));
    expect(JSON.stringify(result.current.users)).toBe(antes);
  });
});
