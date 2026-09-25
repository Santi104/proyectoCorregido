import express from 'express';
import dbPromise from '../utils/db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Listar documentos de una tutela
router.get('/tutela/:tutelaId', authenticateToken, async (req, res) => {
  const db = await dbPromise;
  const docs = await db.all('SELECT * FROM documents WHERE tutelaId = ?', req.params.tutelaId);
  res.json(docs);
});

// Subir documento (solo simulado, sin archivos reales)
router.post('/', authenticateToken, async (req, res) => {
  const { tutelaId, name, url } = req.body;
  const db = await dbPromise;
  const result = await db.run('INSERT INTO documents (tutelaId, name, url, uploadedAt) VALUES (?, ?, ?, ?)', tutelaId, name, url, new Date().toISOString());
  res.json({ id: result.lastID });
});

export default router;
