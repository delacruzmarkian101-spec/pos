const API_URL = "http://localhost:3000";

async function request(endpoint, method = "GET", body = null) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_URL}${endpoint}`, options);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Request failed");
  }
  return res.json();
}

export const api = {
  // Auth
  login: (username, password, role) =>
    request("/auth/login", "POST", { username, password, role }),
  register: (username, password, role) =>
    request("/auth/register", "POST", { username, password, role }),

  // Products
  getProducts: (activeOnly = false) =>
    request(`/products${activeOnly ? "?activeOnly=true" : ""}`),
  createProduct: (productData) => request("/products", "POST", productData),
  updateProduct: (id, productData) =>
    request(`/products/${id}`, "PUT", productData),
  deleteProduct: (id, sellerId) =>
    request(`/products/${id}?sellerId=${sellerId}`, "DELETE"),

  // Orders
  getOrders: (userId, role) => request(`/orders?userId=${userId}&role=${role}`),
  createOrder: (orderData) => request("/orders", "POST", orderData),
};
