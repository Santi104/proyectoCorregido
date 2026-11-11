import { renderHook, act } from "@testing-library/react";
import { UsersProvider, useUsers } from "../../src/context/UsersContext";

const wrapper = ({ children }: { children: React.ReactNode }) => <UsersProvider>{children}</UsersProvider>;
const pedro = { fullName: "Pedro López", email: "pedro@eps.com", role: "EPS" as const, password: "123456" };

// MU-05 addUser() — UsersContext.tsx · Cobertura de decisión
describe("MU-05 addUser()", () => {
  it("CPU-14 correo nuevo -> {ok:true} y registra al usuario", () => {
    const { result } = renderHook(() => useUsers(), { wrapper });
    let r: any;
    act(() => { r = result.current.addUser(pedro); });
    expect(r).toEqual({ ok: true });
    expect(result.current.users[0]).toMatchObject({ email: "pedro@eps.com", role: "EPS", status: "ACTIVE" });
  });
  it("CPU-15 correo pedro@eps.com ya registrado -> {ok:false} y mensaje de duplicado", () => {
    const { result } = renderHook(() => useUsers(), { wrapper });
    act(() => { result.current.addUser(pedro); });
    let r: any;
    act(() => { r = result.current.addUser(pedro); });
    expect(r).toEqual({ ok: false, error: "Ya existe un usuario con ese correo." });
  });
});
