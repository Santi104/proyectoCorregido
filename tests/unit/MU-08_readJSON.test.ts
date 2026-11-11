import { readJSON } from "../../src/utils/storage";

// MU-08 readJSON() — storage.ts · Cobertura de decisión y manejo de excepciones
describe("MU-08 readJSON()", () => {
  it("CPU-21 SG_AUTH sin dato -> retorna el valor alternativo {user:null}", () => {
    expect(readJSON("SG_AUTH", { user: null })).toEqual({ user: null });
  });
  it("CPU-22 SG_AUTH con JSON válido -> retorna el objeto almacenado", () => {
    localStorage.setItem("SG_AUTH", '{"user":{"id":"u_admin"}}');
    expect(readJSON("SG_AUTH", { user: null })).toEqual({ user: { id: "u_admin" } });
  });
  it("CPU-23 SG_AUTH con JSON inválido -> captura el error y retorna {user:null}", () => {
    localStorage.setItem("SG_AUTH", "{dato:");
    expect(readJSON("SG_AUTH", { user: null })).toEqual({ user: null });
  });
});
