import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async () => {
  return new Response(null, {
    status: 302,
    headers: {
      Location: '/login',
      'Set-Cookie': 'session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0',
    },
  });
};
