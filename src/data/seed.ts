import type { User } from "../types/auth";
import type { DocumentItem, TutelaCase } from "../types/tutela";
import { uid } from "../utils/storage";

function hash(p: string) {
  // DEMO: NO usar en producción
  return `demo_hash_${p}`;
}

export const seedUsers: User[] = [
  {
    id: "u_admin",
    fullName: "Admin",
    email: "admin@demo.com",
    role: "ADMIN",
    status: "ACTIVE",
    avatarInitials: "AD",
    passwordHash: hash("123456")
  },
  {
    id: "u_eps",
    fullName: "EPS",
    email: "eps@demo.com",
    role: "EPS",
    status: "ACTIVE",
    avatarInitials: "EP",
    passwordHash: hash("123456")
  },
  {
    id: "u_abogado",
    fullName: "Abogado",
    email: "abogado@demo.com",
    role: "ABOGADO",
    status: "ACTIVE",
    avatarInitials: "AB",
    passwordHash: hash("123456")
  },
];

export const seedTutelas: TutelaCase[] = [
  {
    id: "t_001",
    radicado: "T-2024-001234",
    paciente: "Juan Pérez García",
    juzgado: "Juzgado 15 Civil Municipal",
    fechaNotificacion: "2024-01-18T14:00:00.000Z",
    terminoRespuesta: "2024-01-18T18:00:00.000Z",
    servicioSolicitado: "Cirugía cardiovascular",
    derechoVulnerado: "Vida digna",
    prioridad: "CRITICA",
    observaciones: "Vence hoy. Requiere contestación inmediata.",
    stage: "ANALISIS",
    assignedToUserId: "u_eps",
    receivedAt: "2024-01-18T14:00:00.000Z"
  },
  {
    id: "t_002",
    radicado: "T-2024-001239",
    paciente: "Carlos Mendoza",
    juzgado: "Juzgado 8 Civil del Circuito",
    fechaNotificacion: "2024-01-18T12:30:00.000Z",
    terminoRespuesta: "2024-01-23T18:00:00.000Z",
    servicioSolicitado: "Resonancia magnética",
    derechoVulnerado: "Salud",
    prioridad: "ALTA",
    stage: "RECEPCION",
    receivedAt: "2024-01-18T12:30:00.000Z"
  },
  {
    id: "t_003",
    radicado: "T-2024-001298",
    paciente: "Carlos Rodríguez",
    juzgado: "Juzgado 15 Civil Municipal",
    fechaNotificacion: "2024-01-18T13:00:00.000Z",
    terminoRespuesta: "2024-01-25T18:00:00.000Z",
    servicioSolicitado: "Fallo judicial recibido",
    derechoVulnerado: "Debido proceso",
    prioridad: "ALTA",
    stage: "FALLO",
    receivedAt: "2024-01-18T13:00:00.000Z"
  }
];

export const seedDocs: DocumentItem[] = [
  {
    id: uid("d_"),
    fileName: "Historia_Clinica_Juan_Perez_T-2024-001234.pdf",
    tipo: "HISTORIA_CLINICA",
    sizeLabel: "2.4 MB",
    modifiedAt: "2024-01-15T10:30:00.000Z",
    status: "ACTIVO",
    tags: ["urgente", "cardiología", "v1.2"],
    tutelaId: "t_001"
  },
  {
    id: uid("d_"),
    fileName: "Autorizacion_Cirugia_Maria_Lopez.pdf",
    tipo: "AUTORIZACION",
    sizeLabel: "1.8 MB",
    modifiedAt: "2024-01-14T15:45:00.000Z",
    status: "APROBADO",
    tags: ["cirugía", "autorizado", "v2.0"],
    tutelaId: "t_002"
  },
  {
    id: uid("d_"),
    fileName: "Acta_Comite_Tecnico_Enero_2024.docx",
    tipo: "ACTA_COMITE",
    sizeLabel: "856 KB",
    modifiedAt: "2024-01-13T09:15:00.000Z",
    status: "EN_REVISION",
    tags: ["comité", "enero", "v1.0"]
  }
];
