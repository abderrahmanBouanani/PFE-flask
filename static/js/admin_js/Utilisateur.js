document.addEventListener("DOMContentLoaded", function () {
    // Get the user type from the URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const userType = urlParams.get("type");

    // Load and filter users
    const users = JSON.parse(localStorage.getItem("users")) || [];
    let filteredUsers = users;
    let pageTitle = "Liste des Utilisateurs";
    let cardTitle = "Utilisateurs";

    if (userType) {
      filteredUsers = users.filter(
        (user) => user.type_utilisateur === userType
      );
      if (userType === "client") {
        pageTitle = "Liste des Clients";
        cardTitle = "Clients";
      } else if (userType === "Vendeur") {
        pageTitle = "Liste des Vendeurs";
        cardTitle = "Vendeurs";
      }
    }

    // Update page title and card title
    document.getElementById("pageTitle").textContent = pageTitle;
    document.getElementById("cardTitle").textContent = cardTitle;
    document.title = `ShopAll - ${pageTitle}`;

    // Update user count
    const userCountElement = document.getElementById("clientCount");
    userCountElement.textContent = `Total : ${filteredUsers.length}`;

    // Populate table
    const tableBody = document.getElementById("clientTable");
    tableBody.innerHTML = ""; // Clear existing content

    filteredUsers.forEach((user) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${user.nom}</td>
                <td>${user.email}</td>
                <td>${user.telephone}</td>
                <td>${user.type_utilisateur}</td>
            `;
      tableBody.appendChild(row);
    });
  });