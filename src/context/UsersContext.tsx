import React, { createContext, useContext, useMemo, useState } from "react";
import type { Role, User, UserStatus } from "../types/auth";
import { readJSON, uid, writeJSON } from "../utils/storage";
import { seedUsers } from "../data/seed";

type UsersContextValue = {
  users: User[];
  addUser: (payload: { fullName: string; email: string; role: Role; password: string }) => { ok: boolean; error?: string };
  setStatus: (id: string, status: UserStatus) => void;
  updateUser: (id: string, patch: Partial<Pick<User, "fullName" | "email" | "role">>) => void;
};

const LS_USERS = "SG_USERS";

function hash(p: string) {
  return `demo_hash_${p}`;
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const a = parts[0]?.[0] ?? "U";
  const b = parts[1]?.[0] ?? parts[0]?.[1] ?? "X";
  return (a + b).toUpperCase();
}

const UsersContext = createContext<UsersContextValue | null>(null);

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>(() => {
    const current = readJSON<User[]>(LS_USERS, []);
    if (current.length === 0) {
      writeJSON(LS_USERS, seedUsers);
      return seedUsers;
    }
    return current;
  });

  const persist = (next: User[]) => {
    setUsers(next);
    writeJSON(LS_USERS, next);
  };

  const addUser: UsersContextValue["addUser"] = (payload) => {
    const exists = users.some((u) => u.email.toLowerCase() === payload.email.toLowerCase());
    if (exists) return { ok: false, error: "Ya existe un usuario con ese correo." };

    const u: User = {
      id: uid("u_"),
      fullName: payload.fullName,
      email: payload.email,
      role: payload.role,
      status: "ACTIVE",
      avatarInitials: initials(payload.fullName),
      passwordHash: hash(payload.password)
    };

    persist([u, ...users]);
    return { ok: true };
  };

  const setStatus = (id: string, status: UserStatus) => {
    persist(users.map((u) => (u.id === id ? { ...u, status } : u)));
  };

  const updateUser = (id: string, patch: Partial<Pick<User, "fullName" | "email" | "role">>) => {
    persist(
      users.map((u) =>
        u.id === id
          ? {
              ...u,
              ...patch,
              avatarInitials: patch.fullName ? initials(patch.fullName) : u.avatarInitials
            }
          : u
      )
    );
  };

  const value = useMemo(() => ({ users, addUser, setStatus, updateUser }), [users]);

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
}

export function useUsers() {
  const ctx = useContext(UsersContext);
  if (!ctx) throw new Error("useUsers debe usarse dentro de UsersProvider");
  return ctx;
}
