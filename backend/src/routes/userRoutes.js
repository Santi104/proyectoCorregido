import express from 'express';
import dbPromise from '../utils/db.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// Obtener todos los usuarios (solo ADMIN/EPS)
router.get('/', authenticateToken, authorizeRoles('ADMIN', 'EPS'), async (req, res) => {
  const db = await dbPromise;
  const users = await db.all('SELECT id, name, email, role, status FROM users');
  res.json(users);
});

// Cambiar estado o rol de usuario (solo ADMIN)
router.patch('/:id', authenticateToken, authorizeRoles('ADMIN'), async (req, res) => {
  const { status, role } = req.body;
  const db = await dbPromise;
  await db.run('UPDATE users SET status = COALESCE(?, status), role = COALESCE(?, role) WHERE id = ?', status, role, req.params.id);
  res.json({ ok: true });
});

export default router;
