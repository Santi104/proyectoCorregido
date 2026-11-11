// Configuración de Jest para las pruebas unitarias (tests/unit).
module.exports = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/tests/unit"],
  testMatch: ["**/*.test.{ts,tsx}"],
  setupFilesAfterEnv: ["<rootDir>/tests/unit/setup.ts"],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
  },
  // Cobertura de los archivos que contienen los 8 métodos probados (MU-01 a MU-08)
  collectCoverageFrom: [
    "src/context/AuthContext.tsx",
    "src/context/UsersContext.tsx",
    "src/context/TutelasContext.tsx",
    "src/router/ProtectedRoute.tsx",
    "src/pages/Recepcion/RecepcionTutelasPage.tsx",
    "src/utils/storage.ts",
  ],
  coverageDirectory: "reports/unit/cobertura",
  coverageReporters: ["text", "text-summary", "html", "json-summary", "lcov"],
  reporters: [
    "default",
    ["jest-junit", { outputDirectory: "reports/unit", outputName: "junit.xml", suiteName: "Pruebas unitarias SaludGuard" }],
  ],
};
