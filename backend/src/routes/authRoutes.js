import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbPromise from '../utils/db.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const db = await dbPromise;
  const user = await db.get('SELECT * FROM users WHERE email = ?', email);
  if (!user || user.status !== 'ACTIVE') {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
  const token = jwt.sign({ id: user.id, role: user.role, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '8h' });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, status: user.status } });
});

export default router;
