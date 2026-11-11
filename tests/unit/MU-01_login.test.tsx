import { renderHook, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "../../src/context/AuthContext";
import { seedUsers } from "../../src/data/seed";

const wrapper = ({ children }: { children: React.ReactNode }) => <AuthProvider>{children}</AuthProvider>;

// MU-01 login() — AuthContext.tsx · Cobertura de decisión
describe("MU-01 login()", () => {
  it("CPU-01 usuario activo y contraseña correcta -> {ok:true} y guarda la sesión", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    let r: any;
    act(() => { r = result.current.login("admin@demo.com", "123456"); });
    expect(r).toEqual({ ok: true });
    expect(result.current.state.user?.email).toBe("admin@demo.com");
    expect(JSON.parse(localStorage.getItem("SG_AUTH")!).user.id).toBe("u_admin");
  });

  it("CPU-02 correo que no existe -> {ok:false}", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    let r: any;
    act(() => { r = result.current.login("noexiste@demo.com", "123456"); });
    expect(r.ok).toBe(false);
    expect(result.current.state.user).toBeNull();
  });

  it("CPU-03 usuario FROZEN y contraseña correcta -> {ok:false}", () => {
    localStorage.setItem("SG_USERS", JSON.stringify(seedUsers.map(u => u.id === "u_eps" ? { ...u, status: "FROZEN" } : u)));
    const { result } = renderHook(() => useAuth(), { wrapper });
    let r: any;
    act(() => { r = result.current.login("eps@demo.com", "123456"); });
    expect(r.ok).toBe(false);
  });

  it("CPU-04 usuario activo y contraseña incorrecta -> {ok:false}", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    let r: any;
    act(() => { r = result.current.login("admin@demo.com", "000000"); });
    expect(r.ok).toBe(false);
  });
});
