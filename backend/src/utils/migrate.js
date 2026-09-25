import dbPromise from './db.js';

async function migrate() {
  const db = await dbPromise;
  // Usuarios
  await db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'ACTIVE'
  )`);
  // Tutelas
  await db.exec(`CREATE TABLE IF NOT EXISTS tutelas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    prioridad TEXT,
    stage TEXT,
    assignedToUserId INTEGER,
    receivedAt TEXT,
    FOREIGN KEY (assignedToUserId) REFERENCES users(id)
  )`);
  // Documentos
  await db.exec(`CREATE TABLE IF NOT EXISTS documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tutelaId INTEGER,
    name TEXT NOT NULL,
    url TEXT,
    uploadedAt TEXT,
    FOREIGN KEY (tutelaId) REFERENCES tutelas(id)
  )`);
  console.log('Migración completada.');
  process.exit(0);
}

migrate().catch(e => {
  console.error(e);
  process.exit(1);
});
