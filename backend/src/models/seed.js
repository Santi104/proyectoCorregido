import bcrypt from 'bcryptjs';
import dbPromise from '../utils/db.js';

const users = [
  {
    name: 'Admin',
    email: 'admin@demo.com',
    password: '123456',
    role: 'ADMIN',
    status: 'ACTIVE'
  },
  {
    name: 'EPS',
    email: 'eps@demo.com',
    password: '123456',
    role: 'EPS',
    status: 'ACTIVE'
  },
  {
    name: 'Abogado',
    email: 'abogado@demo.com',
    password: '123456',
    role: 'LAWYER',
    status: 'ACTIVE'
  }
];

async function seed() {
  const db = await dbPromise;
  // Eliminar todos los usuarios existentes
  await db.run('DELETE FROM users');
  // Insertar los nuevos usuarios
  for (const u of users) {
    const hash = await bcrypt.hash(u.password, 10);
    await db.run(
      'INSERT INTO users (name, email, password, role, status) VALUES (?, ?, ?, ?, ?)',
      u.name, u.email, hash, u.role, u.status
    );
  }
  console.log('Usuarios de ejemplo insertados.');
  process.exit(0);
}

seed();
