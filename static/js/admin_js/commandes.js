let allOrders = [];

document.addEventListener("DOMContentLoaded", () => {
  loadOrders();
  document.getElementById("searchButton").addEventListener("click", filterOrders);
  document.getElementById("sortSelect").addEventListener("change", sortOrders);
});

function loadOrders() {
  allOrders = JSON.parse(localStorage.getItem("orders")) || [];

  allOrders = allOrders.map((order) => ({
    ...order,
    status: order.status || "En attente",
  }));
  displayOrders(allOrders);
}

function displayOrders(orders) {
  const ordersList = document.getElementById("ordersList");
  ordersList.innerHTML = "";

  orders.forEach((order) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.customer.firstName} ${order.customer.lastName}</td>
                <td>
                    <button class="btn btn-sm btn-link" onclick="showProducts(${order.id})">
                        Voir les produits
                    </button>
                </td>
                <td>${formatDate(order.date)}</td>
                <td>${order.total.toFixed(2)} DH</td>
                <td>${getStatusBadge(order.status)}</td>
                <td>${getActionButtons(order)}</td>
            `;
    ordersList.appendChild(row);
  });
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, "0")}/${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
}

function getStatusBadge(status) {
  switch (status) {
    case "Confirmée":
      return '<span class="badge bg-success">Confirmée</span>';
    case "Annulée":
      return '<span class="badge bg-danger">Annulée</span>';
    default:
      return '<span class="badge bg-warning text-dark">En attente</span>';
  }
}

function getActionButtons(order) {
  if (order.status === "En attente") {
    return `
                <button class="btn btn-sm btn-success me-2" onclick="confirmOrder(${order.id})">Confirmer</button>
                <button class="btn btn-sm btn-danger" onclick="cancelOrder(${order.id})">Annuler</button>
            `;
  }
  return "";
}

function showProducts(orderId) {
  const order = allOrders.find((o) => o.id === orderId);

  if (order) {
    const modalProductsList =
      document.getElementById("modalProductsList");
    modalProductsList.innerHTML = "";

    order.items.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>${item.price.toFixed(2)} DH</td>
                    <td>${(item.price * item.quantity).toFixed(2)} DH</td>
                `;
      modalProductsList.appendChild(row);
    });

    const modal = new bootstrap.Modal(
      document.getElementById("productsModal")
    );
    modal.show();
  }
}

function filterOrders() {
  const searchTerm = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const filteredOrders = allOrders.filter(
    (order) =>
      order.id.toString().includes(searchTerm) ||
      `${order.customer.firstName} ${order.customer.lastName}`
        .toLowerCase()
        .includes(searchTerm) ||
      formatDate(order.date).includes(searchTerm)
  );
  displayOrders(filteredOrders);
}

function sortOrders() {
  const sortValue = document.getElementById("sortSelect").value;
  let sortedOrders = [...allOrders];

  switch (sortValue) {
    case "date-desc":
      sortedOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case "date-asc":
      sortedOrders.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case "total-desc":
      sortedOrders.sort((a, b) => b.total - a.total);
      break;
    case "total-asc":
      sortedOrders.sort((a, b) => a.total - b.total);
      break;
  }

  displayOrders(sortedOrders);
}

function saveOrders() {
  localStorage.setItem("orders", JSON.stringify(allOrders));
}

function addOrder(newOrder) {
  allOrders.push(newOrder);
  saveOrders();
  displayOrders(allOrders);
}

function deleteOrder(orderId) {
  allOrders = allOrders.filter((order) => order.id !== orderId);
  saveOrders();
  displayOrders(allOrders);
}

function confirmOrder(orderId) {
  const order = allOrders.find((o) => o.id === orderId);
  if (order) {
    order.status = "Confirmée";
    saveOrders();
    displayOrders(allOrders);
  }
}

function cancelOrder(orderId) {
  const order = allOrders.find((o) => o.id === orderId);
  if (order) {
    order.status = "Annulée";
    saveOrders();
    displayOrders(allOrders);
  }
}