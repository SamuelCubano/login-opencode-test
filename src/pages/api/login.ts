import type { APIRoute } from 'astro';
import { createHash } from 'crypto';
import db from '../../db/database';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return new Response(
      JSON.stringify({ error: 'Email y contrasena son obligatorios' }),
      { status: 400 }
    );
  }

  const hashedPassword = createHash('sha256').update(password).digest('hex');

  const user = db.prepare('SELECT id FROM users WHERE email = ? AND password = ?').get(
    email,
    hashedPassword
  ) as any;

  if (!user) {
    return new Response(
      JSON.stringify({ error: 'Credenciales incorrectas' }),
      { status: 401 }
    );
  }

  return new Response(
    JSON.stringify({ message: 'Inicio de sesion exitoso' }),
    {
      status: 200,
      headers: {
        'Set-Cookie': `session=${user.id}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`,
      },
    }
  );
};
