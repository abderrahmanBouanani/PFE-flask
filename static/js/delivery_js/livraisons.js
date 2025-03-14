document.addEventListener("DOMContentLoaded", () => {
    let allDeliveries = []
  
    function loadDeliveries() {
      // Charger les commandes depuis localStorage
      const orders = JSON.parse(localStorage.getItem("orders")) || []
      
      // Convertir les commandes en livraisons
      allDeliveries = orders.map(order => ({
        id: order.id,
        customer: order.customer,
        address: order.customer.address || order.address || "Adresse non spécifiée",
        date: order.date,
        status: mapOrderStatusToDeliveryStatus(order.status),
        total: order.total,
        items: order.items
      }))
      
      displayDeliveries(allDeliveries)
    }
    
    // Convertir le statut de commande en statut de livraison
    function mapOrderStatusToDeliveryStatus(orderStatus) {
      switch (orderStatus) {
        case "Confirmée":
          return "pending"
        case "En attente":
          return "pending"
        case "En cours":
          return "in_progress"
        case "Livrée":
          return "delivered"
        case "Annulée":
          return "cancelled"
        default:
          return "pending"
      }
    }
  
    function displayDeliveries(deliveries) {
      const deliveriesList = document.getElementById("deliveriesList")
      deliveriesList.innerHTML = ""
  
      deliveries.forEach((delivery) => {
        // Ne pas afficher les commandes annulées
        if (delivery.status === "cancelled") return
        
        const row = document.createElement("tr")
        row.innerHTML = `
          <td>${delivery.id}</td>
          <td>${delivery.address}</td>
          <td>${formatDate(delivery.date)}</td>
          <td>${getStatusBadge(delivery.status)}</td>
          <td>
            <button class="btn btn-sm btn-link" onclick="showProducts(${delivery.id})">
              Voir les produits
            </button>
            ${getActionButtons(delivery)}
          </td>
        `
        deliveriesList.appendChild(row)
      })
    }
  
    function formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" }
      return new Date(dateString).toLocaleDateString("fr-FR", options)
    }
  
    function getStatusBadge(status) {
      switch (status) {
        case "pending":
          return '<span class="badge bg-warning text-dark">En attente</span>'
        case "in_progress":
          return '<span class="badge bg-primary">En cours</span>'
        case "delivered":
          return '<span class="badge bg-success">Livrée</span>'
        default:
          return '<span class="badge bg-secondary">Inconnu</span>'
      }
    }
  
    function getActionButtons(delivery) {
      if (delivery.status === "pending") {
        return `<button class="btn btn-sm btn-primary" onclick="startDelivery(${delivery.id})">Commencer</button>`
      } else if (delivery.status === "in_progress") {
        return `<button class="btn btn-sm btn-success" onclick="completeDelivery(${delivery.id})">Terminer</button>`
      }
      return ""
    }
  
    function filterDeliveries() {
      const searchTerm = document.getElementById("searchInput").value.toLowerCase()
      const statusFilter = document.getElementById("statusFilter").value
  
      const filteredDeliveries = allDeliveries.filter(
        (delivery) =>
          (delivery.id.toString().includes(searchTerm) ||
            delivery.address.toLowerCase().includes(searchTerm) ||
            `${delivery.customer.firstName} ${delivery.customer.lastName}`.toLowerCase().includes(searchTerm)) &&
          (statusFilter === "all" || delivery.status === statusFilter) &&
          delivery.status !== "cancelled"
      )
  
      displayDeliveries(filteredDeliveries)
    }
  
    window.showProducts = (id) => {
      const delivery = allDeliveries.find((d) => d.id === id)
      if (delivery) {
        const modalProductsList = document.getElementById("modalProductsList")
        modalProductsList.innerHTML = ""
        delivery.items.forEach((item) => {
          const row = document.createElement("tr")
          row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.price.toFixed(2)} DH</td>
            <td>${(item.quantity * item.price).toFixed(2)} DH</td>
          `
          modalProductsList.appendChild(row)
        })
        
        const myModal = new bootstrap.Modal(document.getElementById("productsModal"))
        myModal.show()
      }
    }
  
    // Sauvegarder les modifications dans localStorage
    function saveDeliveries() {
      // Récupérer les commandes existantes
      const orders = JSON.parse(localStorage.getItem("orders")) || []
      
      // Mettre à jour le statut des commandes en fonction des livraisons
      allDeliveries.forEach(delivery => {
        const orderIndex = orders.findIndex(order => order.id === delivery.id)
        if (orderIndex !== -1) {
          // Mettre à jour le statut de la commande
          if (delivery.status === "delivered") {
            orders[orderIndex].status = "Livrée"
          } else if (delivery.status === "in_progress") {
            orders[orderIndex].status = "En cours"
          }
        }
      })
      
      // Sauvegarder les commandes mises à jour
      localStorage.setItem("orders", JSON.stringify(orders))
    }
  
    // Initialiser la page
    loadDeliveries()
  
    // Ajouter les écouteurs d'événements
    document.getElementById("searchButton").addEventListener("click", filterDeliveries)
    document.getElementById("searchInput").addEventListener("input", filterDeliveries)
    document.getElementById("statusFilter").addEventListener("change", filterDeliveries)
  
    // Ces fonctions seraient connectées à un backend dans une application réelle
    window.startDelivery = (id) => {
      const delivery = allDeliveries.find((d) => d.id === id)
      if (delivery) {
        delivery.status = "in_progress"
        saveDeliveries()
        displayDeliveries(allDeliveries)
      }
    }
  
    window.completeDelivery = (id) => {
      const delivery = allDeliveries.find((d) => d.id === id)
      if (delivery) {
        delivery.status = "delivered"
        saveDeliveries()
        displayDeliveries(allDeliveries)
      }
    }
  })