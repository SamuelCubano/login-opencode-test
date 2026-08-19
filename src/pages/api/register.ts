import type { APIRoute } from 'astro';
import { createHash } from 'crypto';
import db from '../../db/database';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return new Response(
      JSON.stringify({ error: 'Todos los campos son obligatorios' }),
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return new Response(
      JSON.stringify({ error: 'La contrasena debe tener al menos 6 caracteres' }),
      { status: 400 }
    );
  }

  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (existing) {
    return new Response(
      JSON.stringify({ error: 'El email ya esta registrado' }),
      { status: 409 }
    );
  }

  const hashedPassword = createHash('sha256').update(password).digest('hex');

  db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)').run(
    name,
    email,
    hashedPassword
  );

  return new Response(
    JSON.stringify({ message: 'Usuario registrado exitosamente' }),
    { status: 201 }
  );
};
