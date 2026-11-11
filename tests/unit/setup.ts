import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";

// Después de cada caso: desmontar componentes y limpiar localStorage para que ningún caso dependa de otro
afterEach(() => {
  cleanup();
  localStorage.clear();
});
