import express from 'express';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

const router = express.Router();

// In-memory user storage (for demo without database)
const users: { id: string; email: string; password: string }[] = [];

const isValidEmail = (value: unknown): value is string =>
  typeof value === 'string' &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const isValidPassword = (value: unknown): value is string =>
  typeof value === 'string' && value.length >= 8;

router.post('/signup', async (req, res) => {
  const { email, password } = req.body ?? {};

  if (!isValidEmail(email) || !isValidPassword(password)) {
    return res.status(400).json({
      error: 'Please provide a valid email and a password with at least 8 characters.',
    });
  }

  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = users.find((u) => u.email === normalizedEmail);
  if (existingUser) {
    return res.status(400).json({ error: 'Email already registered' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = {
    id: randomUUID(),
    email: normalizedEmail,
    password: hashedPassword,
  };

  users.push(user);

  res.status(201).json({ message: 'User created successfully', userId: user.id });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body ?? {};

  if (!isValidEmail(email) || !isValidPassword(password)) {
    return res.status(400).json({
      error: 'Please provide a valid email and a password with at least 8 characters.',
    });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = users.find((u) => u.email === normalizedEmail);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.json({ message: 'Login successful', userId: user.id });
});

export default router;