const baseUrl = "http://localhost:3001";

function getItemList() {
  return fetch(`${baseUrl}/items`).then((res) => {
    if (res.ok) return res.json();
    return Promise.reject(`Error: ${res.status}`);
  });
}

function addItem({ name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to add item");
    }
    return res.json();
  });
}

function deleteItem(_id) {
  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to delete item");
    }
    return res.json();
  });
}

export { getItemList, addItem, deleteItem };
