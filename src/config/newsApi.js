import { API_URL } from "@env";

async function apiFetch(path, options = {}) {
  const url = `${API_URL}${path}`;
  const defaultHeaders = { "Content-Type": "application/json" };
  options.headers = { ...defaultHeaders, ...(options.headers || {}) };

  try {
    const res = await fetch(url, options);
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      throw { status: res.status, data };
    }
    return data;
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw { message: "Respuesta no es JSON", original: err };
    }
    throw err;
  }
}

export const fetchNews = (offset = 0, limit = 10) =>
  apiFetch(`/news?offset=${offset}&limit=${limit}`, { method: "GET" });
