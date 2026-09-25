export type TutelaPriority = "BAJA" | "MEDIA" | "ALTA" | "CRITICA";

export type TutelaStage =
  | "RECEPCION"
  | "ANALISIS"
  | "CONTESTACION"
  | "DOCUMENTAL"
  | "FALLO"
  | "CERRADA";

export interface TutelaCase {
  id: string;
  radicado: string;
  paciente: string;
  juzgado: string;
  fechaNotificacion: string; // ISO
  terminoRespuesta: string; // ISO
  servicioSolicitado: string;
  derechoVulnerado: string;
  prioridad: TutelaPriority;
  observaciones?: string;

  stage: TutelaStage;

  assignedToUserId?: string; // asignación
  receivedAt: string; // ISO
}

export interface DocumentItem {
  id: string;
  fileName: string;
  tipo: "HISTORIA_CLINICA" | "AUTORIZACION" | "ACTA_COMITE" | "PQR" | "CONTESTACION" | "FALLO";
  sizeLabel: string; // "1.8 MB"
  modifiedAt: string; // ISO
  status: "ACTIVO" | "APROBADO" | "EN_REVISION";
  tags: string[];
  tutelaId?: string;
}
