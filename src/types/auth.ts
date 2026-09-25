export type Role = "ADMIN" | "EPS" | "ABOGADO";

export type UserStatus = "ACTIVE" | "FROZEN" | "DELETED";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: Role;
  status: UserStatus;
  avatarInitials: string; // ej: "DMG"
  passwordHash: string; // demo (no real)
}

export interface AuthState {
  user: User | null;
}
