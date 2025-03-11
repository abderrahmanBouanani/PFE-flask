// Récupérer les informations de l'utilisateur connecté depuis le localStorage
let connectedUser = JSON.parse(localStorage.getItem("connectedUser"));

function displayUserInfo() {
  if (connectedUser) {
    // Afficher les informations de l'utilisateur
    const userInfoContainer = document.getElementById("userInfo");
    userInfoContainer.innerHTML = `
              <div class="col-md-6 mb-3">
                  <div class="user-info-item">
                      <span class="user-info-label">Nom :</span>
                      <span class="user-info-value">${connectedUser.nom}</span>
                  </div>
              </div>
              <div class="col-md-6 mb-3">
                  <div class="user-info-item">
                      <span class="user-info-label">Prénom :</span>
                      <span class="user-info-value">${connectedUser.prenom}</span>
                  </div>
              </div>
              <div class="col-md-6 mb-3">
                  <div class="user-info-item">
                      <span class="user-info-label">Email :</span>
                      <span class="user-info-value">${connectedUser.email}</span>
                  </div>
              </div>
              <div class="col-md-6 mb-3">
                  <div class="user-info-item">
                      <span class="user-info-label">Téléphone :</span>
                      <span class="user-info-value">${connectedUser.telephone}</span>
                  </div>
              </div>
              <div class="col-12">
                  <div class="user-info-item">
                      <span class="user-info-label">Type d'utilisateur :</span>
                      <span class="user-info-value">${connectedUser.type_utilisateur}</span>
                  </div>
              </div>
          `;
  } else {
    // Si aucun utilisateur connecté n'est trouvé
    const userInfoContainer = document.getElementById("userInfo");
    userInfoContainer.innerHTML =
      "<p class='text-center'>Aucune information disponible. Veuillez vous connecter d'abord.</p>";
  }
}

displayUserInfo();

// Gérer l'ouverture du modal d'édition
document.getElementById("editProfileBtn").addEventListener("click", function () {
  if (connectedUser) {
    document.getElementById("editNom").value = connectedUser.nom;
    document.getElementById("editPrenom").value = connectedUser.prenom;
    document.getElementById("editEmail").value = connectedUser.email;
    document.getElementById("editTelephone").value = connectedUser.telephone;
    new bootstrap.Modal(document.getElementById("editProfileModal")).show();
  }
});

// Gérer la sauvegarde des modifications
document.getElementById("saveProfileChanges").addEventListener("click", function () {
  const newNom = document.getElementById("editNom").value;
  const newPrenom = document.getElementById("editPrenom").value;
  const newEmail = document.getElementById("editEmail").value;
  const newTelephone = document.getElementById("editTelephone").value;
  const newMotDePasse = document.getElementById("editMotDePasse").value;

  // Mettre à jour les informations de l'utilisateur connecté
  connectedUser.nom = newNom;
  connectedUser.prenom = newPrenom;
  connectedUser.email = newEmail;
  connectedUser.telephone = newTelephone;
  if (newMotDePasse) {
    connectedUser.motdepasse = newMotDePasse;
  }

  // Mettre à jour le localStorage
  localStorage.setItem("connectedUser", JSON.stringify(connectedUser));

  // Mettre à jour la liste des utilisateurs dans le localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const userIndex = users.findIndex((user) => user.email === connectedUser.email);
  if (userIndex !== -1) {
    users[userIndex] = connectedUser;
    localStorage.setItem("users", JSON.stringify(users));
  }

  // Rafraîchir l'affichage
  displayUserInfo();

  // Fermer le modal
  bootstrap.Modal.getInstance(document.getElementById("editProfileModal")).hide();
});