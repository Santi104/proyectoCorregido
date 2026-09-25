import type { Role } from "../types/auth";

export function canManageUsers(role: Role) {
  return role === "EPS" || role === "ADMIN";
}

export function canAssignAnyCase(role: Role) {
  // EPS puede asignar a otros; Admin también.
  return role === "EPS" || role === "ADMIN";
}

export function canSelfAssignOnly(role: Role) {
  return role === "ABOGADO";
}
