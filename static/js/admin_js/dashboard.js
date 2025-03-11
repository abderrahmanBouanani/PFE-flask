document.addEventListener("DOMContentLoaded", function () {
    loadDashboardData();
    initializeCharts();
  });

  function loadDashboardData() {
    loadTotalProducts();
    loadUserData();
    loadOrdersData();
  }

  function initializeCharts() {
    // Get data from localStorage
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingProducts = [
      {
        name: "MSI",
        price: 11500.0,
        image: "/static/images/pc1.jpg",
        category: "Ordinateurs",
      },
      {
        name: "Ecran Dell",
        price: 1500.0,
        image: "/static/images/ecran12.jpg",
        category: "Écrans",
      },
      {
        name: "Ecran Dell mini",
        price: 2000.0,
        image: "/static/images/pc2.jpg",
        category: "Écrans",
      },
      {
        name: "Ecran Gamer 60HZ",
        price: 3500.0,
        image: "/static/images/pc4.jpg",
        category: "Écrans",
      },
      {
        name: "Asus i3",
        price: 3500.0,
        image: "/static/images/unite1.jpg",
        category: "Ordinateurs",
      },
      {
        name: "Dell I5",
        price: 3000.0,
        image: "/static/images/unite4.webp",
        category: "Ordinateurs",
      },
      {
        name: "HP I7",
        price: 5000.0,
        image: "/static/images/uniten1.webp",
        category: "Ordinateurs",
      },
      {
        name: "HP I5",
        price: 3000.0,
        image: "/static/images/uniten2.jpeg",
        category: "Ordinateurs",
      },
      {
        name: "World Time",
        price: 5000.0,
        image: "/static/images/montre1.jpg",
        category: "Montres",
      },
      {
        name: "Rolex",
        price: 7000.0,
        image: "/static/images/montre2.jpg",
        category: "Montres",
      },
      {
        name: "Boss Collection",
        price: 8500.0,
        image: "/static/images/montre6.jpg",
        category: "Montres",
      },
      {
        name: "Boss Collection Black",
        price: 8000.0,
        image: "/static/images/montre7.jpg",
        category: "Montres",
      },
      {
        name: "Chaise Gamer",
        price: 2500.0,
        image: "/static/images/chaise1.jpg",
        category: "Chaises",
      },
      {
        name: "Chaise Gamer",
        price: 3000.0,
        image: "/static/images/chaise2.jpg",
        category: "Chaises",
      },
      {
        name: "Chaise normal",
        price: 700.0,
        image: "/static/images/product-2.png",
        category: "Chaises",
      },
      {
        name: "Chaise Zen",
        price: 400.0,
        image: "/static/images/product-1.png",
        category: "Chaises",
      },
      {
        name: "Clavier Mécanique",
        price: 1500.0,
        image: "/static/images/clavier1.jpg",
        category: "Claviers",
      },
      {
        name: "Clavier Mécanique (puissant)",
        price: 1700.0,
        image: "/static/images/clavier2.jpg",
        category: "Claviers",
      },
      {
        name: "Clavier Normal",
        price: 200.0,
        image: "/static/images/clavier3.jpg",
        category: "Claviers",
      },
      {
        name: "Clavier Normal Standard",
        price: 250.0,
        image: "/static/images/clavier4.jpg",
        category: "Claviers",
      },
    ];
    const localStorageProducts =
      JSON.parse(localStorage.getItem("products")) || [];
    const allProducts = [...existingProducts, ...localStorageProducts];

    // Process data for daily orders chart
    const last7Days = [...Array(7)]
      .map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toISOString().split("T")[0];
      })
      .reverse();

    const dailyOrders = last7Days.map((date) => {
      return orders.filter((order) => order.date.startsWith(date)).length;
    });

    // Process data for revenue chart
    const dailyRevenue = last7Days.map((date) => {
      return orders
        .filter((order) => order.date.startsWith(date))
        .reduce((sum, order) => sum + order.total, 0);
    });

    // Process data for categories distribution
    const categoryCount = allProducts.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {});

    // Daily Orders Bar Chart
    const ordersChartOptions = {
      series: [
        {
          name: "Commandes",
          data: dailyOrders,
        },
      ],
      chart: {
        type: "bar",
        height: 300,
        toolbar: { show: false },
      },
      colors: [
        getComputedStyle(document.documentElement).getPropertyValue(
          "--chart-color-1"
        ),
      ],
      plotOptions: {
        bar: { borderRadius: 4 },
      },
      xaxis: {
        categories: ["Mar", "Mer", "Jeu", "Ven", "Sam", "Dim", "Lun"],
      },
    };
    new ApexCharts(
      document.querySelector("#ordersChart"),
      ordersChartOptions
    ).render();

    // Revenue Line Chart
    const revenueChartOptions = {
      series: [
        {
          name: "Revenus",
          data: dailyRevenue,
        },
      ],
      chart: {
        type: "line",
        height: 300,
        toolbar: { show: false },
      },
      colors: [
        getComputedStyle(document.documentElement).getPropertyValue(
          "--chart-color-2"
        ),
      ],
      stroke: { curve: "smooth" },
      xaxis: {
        categories: [
          "Lundi",
          "Mardi",
          "Mercredi",
          "Jeudi",
          "Vendredi",
          "Samedi",
          "Dimanche",
        ],
      },
      yaxis: {
        labels: {
          formatter: (value) => value + " DH",
        },
      },
    };
    new ApexCharts(
      document.querySelector("#revenueChart"),
      revenueChartOptions
    ).render();

    // Categories Distribution Chart
    const categoriesChartOptions = {
      series: Object.values(categoryCount),
      chart: {
        type: "pie",
        height: 300,
      },
      labels: Object.keys(categoryCount),
      colors: [
        getComputedStyle(document.documentElement).getPropertyValue(
          "--chart-color-1"
        ),
        getComputedStyle(document.documentElement).getPropertyValue(
          "--chart-color-2"
        ),
        getComputedStyle(document.documentElement).getPropertyValue(
          "--chart-color-3"
        ),
        getComputedStyle(document.documentElement).getPropertyValue(
          "--chart-color-4"
        ),
        getComputedStyle(document.documentElement).getPropertyValue(
          "--chart-color-5"
        ),
      ],
    };
    new ApexCharts(
      document.querySelector("#categoriesChart"),
      categoriesChartOptions
    ).render();

    // User Statistics Chart
    const userStatsChartOptions = {
      series: [
        {
          name: "Clients",
          data: [
            users.filter((u) => u.type_utilisateur === "client").length,
          ],
        },
        {
          name: "Vendeurs",
          data: [
            users.filter((u) => u.type_utilisateur === "Vendeur").length,
          ],
        },
      ],
      chart: {
        type: "bar",
        height: 300,
        toolbar: { show: false },
      },
      colors: [
        getComputedStyle(document.documentElement).getPropertyValue(
          "--chart-color-1"
        ),
        getComputedStyle(document.documentElement).getPropertyValue(
          "--chart-color-2"
        ),
      ],
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: "top",
          },
        },
      },
      xaxis: {
        categories: ["Utilisateurs"],
      },
    };
    new ApexCharts(
      document.querySelector("#userStatsChart"),
      userStatsChartOptions
    ).render();
  }

  function loadTotalProducts() {
    const existingProducts = [
      {
        name: "MSI",
        price: 11500.0,
        image: "/static/images/pc1.jpg",
        category: "Ordinateurs",
      },
      {
        name: "Ecran Dell",
        price: 1500.0,
        image: "/static/images/ecran12.jpg",
        category: "Écrans",
      },
      {
        name: "Ecran Dell mini",
        price: 2000.0,
        image: "/static/images/pc2.jpg",
        category: "Écrans",
      },
      {
        name: "Ecran Gamer 60HZ",
        price: 3500.0,
        image: "/static/images/pc4.jpg",
        category: "Écrans",
      },
      {
        name: "Asus i3",
        price: 3500.0,
        image: "/static/images/unite1.jpg",
        category: "Ordinateurs",
      },
      {
        name: "Dell I5",
        price: 3000.0,
        image: "/static/images/unite4.webp",
        category: "Ordinateurs",
      },
      {
        name: "HP I7",
        price: 5000.0,
        image: "/static/images/uniten1.webp",
        category: "Ordinateurs",
      },
      {
        name: "HP I5",
        price: 3000.0,
        image: "/static/images/uniten2.jpeg",
        category: "Ordinateurs",
      },
      {
        name: "World Time",
        price: 5000.0,
        image: "/static/images/montre1.jpg",
        category: "Montres",
      },
      {
        name: "Rolex",
        price: 7000.0,
        image: "/static/images/montre2.jpg",
        category: "Montres",
      },
      {
        name: "Boss Collection",
        price: 8500.0,
        image: "/static/images/montre6.jpg",
        category: "Montres",
      },
      {
        name: "Boss Collection Black",
        price: 8000.0,
        image: "/static/images/montre7.jpg",
        category: "Montres",
      },
      {
        name: "Chaise Gamer",
        price: 2500.0,
        image: "/static/images/chaise1.jpg",
        category: "Chaises",
      },
      {
        name: "Chaise Gamer",
        price: 3000.0,
        image: "/static/images/chaise2.jpg",
        category: "Chaises",
      },
      {
        name: "Chaise normal",
        price: 700.0,
        image: "/static/images/product-2.png",
        category: "Chaises",
      },
      {
        name: "Chaise Zen",
        price: 400.0,
        image: "/static/images/product-1.png",
        category: "Chaises",
      },
      {
        name: "Clavier Mécanique",
        price: 1500.0,
        image: "/static/images/clavier1.jpg",
        category: "Claviers",
      },
      {
        name: "Clavier Mécanique (puissant)",
        price: 1700.0,
        image: "/static/images/clavier2.jpg",
        category: "Claviers",
      },
      {
        name: "Clavier Normal",
        price: 200.0,
        image: "/static/images/clavier3.jpg",
        category: "Claviers",
      },
      {
        name: "Clavier Normal Standard",
        price: 250.0,
        image: "/static/images/clavier4.jpg",
        category: "Claviers",
      },
    ];
    const localStorageProducts =
      JSON.parse(localStorage.getItem("products")) || [];
    const totalProducts =
      existingProducts.length + localStorageProducts.length;
    document.getElementById("totalProducts").textContent = totalProducts;
  }

  function loadUserData() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const totalClients = users.filter(
      (user) => user.type_utilisateur === "client"
    ).length;
    const totalVendors = users.filter(
      (user) => user.type_utilisateur === "Vendeur"
    ).length;

    document.getElementById("totalClients").textContent = totalClients;
    document.getElementById("totalVendors").textContent = totalVendors;
  }

  function loadOrdersData() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    document.getElementById("totalOrders").textContent = orders.length;

    const recentOrdersContainer = document.getElementById("recentOrders");
    const recentOrders = orders.slice(-5).reverse();

    if (recentOrders.length === 0) {
      recentOrdersContainer.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center">Aucune commande disponible</td>
                </tr>
            `;
    } else {
      recentOrdersContainer.innerHTML = recentOrders
        .map(
          (order) => `
                <tr>
                    <td>${getDayOfWeek(new Date(order.date))}</td>
                    <td>${order.customer.firstName} ${
            order.customer.lastName
          }</td>
                    <td>${order.items
                      .map((item) => item.name)
                      .join(", ")}</td>
                    <td>${order.total.toFixed(2)} DH</td>
                </tr>
            `
        )
        .join("");
    }
  }

  function getDayOfWeek(date) {
    const days = [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ];
    return days[date.getDay()];
  }
