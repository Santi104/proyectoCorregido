import React, { createContext, useContext, useMemo, useState } from "react";
import type { AuthState, User } from "../types/auth";
import { readJSON, writeJSON } from "../utils/storage";
import { seedUsers } from "../data/seed";

type AuthContextValue = {
  state: AuthState;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
};

const LS_USERS = "SG_USERS";
const LS_AUTH = "SG_AUTH";

function hash(p: string) {
  return `demo_hash_${p}`;
}

function ensureUsersSeeded() {
  const existing = readJSON<User[]>(LS_USERS, []);
  if (existing.length === 0) writeJSON<User[]>(LS_USERS, seedUsers);
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  ensureUsersSeeded();

  const [state, setState] = useState<AuthState>(() => {
    const saved = readJSON<AuthState>(LS_AUTH, { user: null });
    return saved;
  });

  const login: AuthContextValue["login"] = (email, password) => {
    const users = readJSON<User[]>(LS_USERS, []);
    const u = users.find((x) => x.email.toLowerCase() === email.toLowerCase());

    if (!u || u.status !== "ACTIVE") return { ok: false, error: "Credenciales inválidas." };
    if (u.passwordHash !== hash(password)) return { ok: false, error: "Credenciales inválidas." };

    const next = { user: u };
    setState(next);
    writeJSON(LS_AUTH, next);
    return { ok: true };
  };

  const logout = () => {
    const next = { user: null };
    setState(next);
    writeJSON(LS_AUTH, next);
  };

  const value = useMemo(() => ({ state, login, logout }), [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
