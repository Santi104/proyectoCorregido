import React, { createContext, useContext, useMemo, useState } from "react";
import type { DocumentItem, TutelaCase, TutelaPriority, TutelaStage } from "../types/tutela";
import { readJSON, uid, writeJSON } from "../utils/storage";
import { seedDocs, seedTutelas } from "../data/seed";

type TutelasContextValue = {
  tutelas: TutelaCase[];
  docs: DocumentItem[];
  createTutela: (payload: Omit<TutelaCase, "id" | "receivedAt" | "stage">) => void;
  updateTutela: (id: string, patch: Partial<TutelaCase>) => void;
  assignTutela: (tutelaId: string, userId: string) => void;
  selfAssignTutela: (tutelaId: string, userId: string) => void;

  // utilidades para reportes/estadísticas
  countBy: (predicate: (t: TutelaCase) => boolean) => number;
  stageCount: (stage: TutelaStage) => number;
  priorityCount: (p: TutelaPriority) => number;
};

const LS_TUTELAS = "SG_TUTELAS";
const LS_DOCS = "SG_DOCS";

const TutelasContext = createContext<TutelasContextValue | null>(null);

export function TutelasProvider({ children }: { children: React.ReactNode }) {
  const [tutelas, setTutelas] = useState<TutelaCase[]>(() => {
    const cur = readJSON<TutelaCase[]>(LS_TUTELAS, []);
    if (cur.length === 0) {
      writeJSON(LS_TUTELAS, seedTutelas);
      return seedTutelas;
    }
    return cur;
  });

  const [docs, setDocs] = useState<DocumentItem[]>(() => {
    const cur = readJSON<DocumentItem[]>(LS_DOCS, []);
    if (cur.length === 0) {
      writeJSON(LS_DOCS, seedDocs);
      return seedDocs;
    }
    return cur;
  });

  const persistTutelas = (next: TutelaCase[]) => {
    setTutelas(next);
    writeJSON(LS_TUTELAS, next);
  };

  const createTutela: TutelasContextValue["createTutela"] = (payload) => {
    const next: TutelaCase = {
      ...payload,
      id: uid("t_"),
      receivedAt: new Date().toISOString(),
      stage: "RECEPCION"
    };
    persistTutelas([next, ...tutelas]);
  };

  const updateTutela: TutelasContextValue["updateTutela"] = (id, patch) => {
    persistTutelas(tutelas.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  };

  const assignTutela: TutelasContextValue["assignTutela"] = (tutelaId, userId) => {
    persistTutelas(tutelas.map((t) => (t.id === tutelaId ? { ...t, assignedToUserId: userId } : t)));
  };

  const selfAssignTutela: TutelasContextValue["selfAssignTutela"] = (tutelaId, userId) => {
    persistTutelas(
      tutelas.map((t) =>
        t.id === tutelaId
          ? t.assignedToUserId
            ? t // si ya está asignada, no cambia (regla simple)
            : { ...t, assignedToUserId: userId }
          : t
      )
    );
  };

  const countBy = (predicate: (t: TutelaCase) => boolean) => tutelas.filter(predicate).length;
  const stageCount = (stage: TutelaStage) => tutelas.filter((t) => t.stage === stage).length;
  const priorityCount = (p: TutelaPriority) => tutelas.filter((t) => t.prioridad === p).length;

  const value = useMemo(
    () => ({
      tutelas,
      docs,
      createTutela,
      updateTutela,
      assignTutela,
      selfAssignTutela,
      countBy,
      stageCount,
      priorityCount
    }),
    [tutelas, docs]
  );

  return <TutelasContext.Provider value={value}>{children}</TutelasContext.Provider>;
}

export function useTutelas() {
  const ctx = useContext(TutelasContext);
  if (!ctx) throw new Error("useTutelas debe usarse dentro de TutelasProvider");
  return ctx;
}
