import { API_URL } from "@env";

async function apiFetch(path, options = {}) {
  const url = `${API_URL}${path}`;
  const defaultHeaders = { "Content-Type": "application/json" };
  options.headers = { ...defaultHeaders, ...(options.headers || {}) };

  try {
    const res = await fetch(url, options);
    const text = await res.text(); // leer cuerpo crudo
    const data = text ? JSON.parse(text) : null; // evitar error si cuerpo vacío

    if (!res.ok) {
      // Normalizar error: incluir código y mensaje
      throw { status: res.status, data };
    }
    return data;
  } catch (err) {
    // Lanzar un error consistente para el consumidor
    if (err instanceof SyntaxError) {
      throw { message: "Respuesta no es JSON", original: err };
    }
    throw err;
  }
}

export const registerUser = (userData) =>
  apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });

export const loginUser = (loginData) =>
  apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(loginData),
  });

export const getProfile = (token) =>
  apiFetch("/auth/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });