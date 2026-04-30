// web_client/js/api.js

const BASE_URL = "https://ressuman-flask-python-user-product.onrender.com";

// ── Token management ────────────────────────────────────────
const Token = {
  get: () => localStorage.getItem("nexus_token") || "",
  set: (t) => localStorage.setItem("nexus_token", t),
  clear: () => localStorage.removeItem("nexus_token"),
};

// ── Core request ────────────────────────────────────────────
async function request(method, path, body = null, auth = false) {
  const headers = { "Content-Type": "application/json" };
  if (auth) headers["Authorization"] = `Bearer ${Token.get()}`;

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  const start = Date.now();
  const res = await fetch(`${BASE_URL}${path}`, options);
  const elapsed = Date.now() - start;
  const data = await res.json();

  return { data, status: res.status, ok: res.ok, elapsed };
}

// ══════════════════════════════════════════════════════════
// AUTH
// ══════════════════════════════════════════════════════════
const Auth = {
  register: (username, password) =>
    request("POST", "/register", { username, password }),

  login: (username, password) =>
    request("POST", "/login", { username, password }),

  logout: () => request("POST", "/logout", null, true),
};

// ══════════════════════════════════════════════════════════
// USERS
// ══════════════════════════════════════════════════════════
const Users = {
  getAll: () => request("GET", "/users", null, true),

  getOne: (id) => request("GET", `/users/${id}`, null, true),

  update: (id, username, password) =>
    request("PUT", `/users/${id}`, { username, password }, true),

  delete: (id) => request("DELETE", `/users/${id}`, null, true),
};

// ══════════════════════════════════════════════════════════
// PRODUCTS
// ══════════════════════════════════════════════════════════
const Products = {
  getAll: () => request("GET", "/products"),

  getOne: (id) => request("GET", `/products/${id}`),

  create: (name, price) => request("POST", "/products", { name, price }, true),

  update: (id, name, price) =>
    request("PUT", `/products/${id}`, { name, price }, true),

  delete: (id) => request("DELETE", `/products/${id}`, null, true),
};
