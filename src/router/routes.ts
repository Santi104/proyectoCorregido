export const routes = {
  login: "/login",
  dashboard: "/dashboard",
  recepcion: "/recepcion",
  analisis: "/analisis",
  contestaciones: "/contestaciones",
  documental: "/documental",
  alertas: "/alertas",
  reportes: "/reportes",
  recursos: "/recursos",
  perfil: "/perfil",

  // ✅ agregar esto
  cumplimiento: "/cumplimiento",

  // solo EPS/Admin
  usuarios: "/usuarios",
} as const;

export type RouteKey = keyof typeof routes;
