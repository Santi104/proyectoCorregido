import express from 'express';
import dbPromise from '../utils/db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Listar tutelas
router.get('/', authenticateToken, async (req, res) => {
  const db = await dbPromise;
  const tutelas = await db.all('SELECT * FROM tutelas');
  res.json(tutelas);
});

// Crear tutela
router.post('/', authenticateToken, async (req, res) => {
  const { title, description, prioridad } = req.body;
  const db = await dbPromise;
  const result = await db.run('INSERT INTO tutelas (title, description, prioridad, stage, receivedAt) VALUES (?, ?, ?, ?, ?)', title, description, prioridad, 'RECEPCION', new Date().toISOString());
  res.json({ id: result.lastID });
});

// Asignar tutela a usuario
router.patch('/:id/assign', authenticateToken, async (req, res) => {
  const { userId } = req.body;
  const db = await dbPromise;
  await db.run('UPDATE tutelas SET assignedToUserId = ? WHERE id = ?', userId, req.params.id);
  res.json({ ok: true });
});

export default router;
