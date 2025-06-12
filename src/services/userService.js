// src/services/userService.js
const BASE = import.meta.env.VITE_REST_API;

export async function createUserRest({ nombre, email, password, rol_id }) {
  const resp = await fetch(`${BASE}/crearuser`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, password, rol_id }),
  });
  if (!resp.ok) throw new Error(await resp.text());
  return resp.text(); // tu controller devuelve un String
}

export async function loginRest(email, password) {
  const resp = await fetch(`${BASE}/Login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!resp.ok) throw new Error(`Login falló: ${resp.status}`);
  return resp.json(); // { usuario: {...}, token: '...' }
}
