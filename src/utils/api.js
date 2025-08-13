const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  if (res.ok) return res.json();
  return Promise.reject(`Error ${res.status}`);
}

function authHeaders() {
  const token = localStorage.getItem("jwt");
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
}

function getItemList() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

function addItem({ name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);
}

function deleteItem(_id) {
  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: authHeaders(),
  }).then(checkResponse);
}

function register({ email, password, name, avatar }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, avatar }),
  }).then(checkResponse);
}

function login({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

function getUserInfo(token) {
  return fetch(`${baseUrl}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function updateProfile({ name, avatar }) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
}

function addCardLike(id) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: authHeaders(),
  }).then(checkResponse);
}

function removeCardLike(id) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: authHeaders(),
  }).then(checkResponse);
}

export {
  getItemList,
  addItem,
  deleteItem,
  checkResponse,
  register,
  login,
  getUserInfo,
  updateProfile,
  addCardLike,
  removeCardLike,
};
