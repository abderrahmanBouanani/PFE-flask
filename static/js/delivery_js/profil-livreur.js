import * as bootstrap from "bootstrap"

document.addEventListener("DOMContentLoaded", () => {
  const connectedUser = JSON.parse(localStorage.getItem("connectedUser"))

  function displayUserInfo() {
    if (connectedUser) {
      const userInfoContainer = document.getElementById("userInfo")
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
            `
    } else {
      const userInfoContainer = document.getElementById("userInfo")
      userInfoContainer.innerHTML =
        "<p class='text-center'>Aucune information disponible. Veuillez vous connecter d'abord.</p>"
    }
  }

  displayUserInfo()

  document.getElementById("editProfileBtn").addEventListener("click", () => {
    if (connectedUser) {
      document.getElementById("editNom").value = connectedUser.nom
      document.getElementById("editPrenom").value = connectedUser.prenom
      document.getElementById("editEmail").value = connectedUser.email
      document.getElementById("editTelephone").value = connectedUser.telephone
      new bootstrap.Modal(document.getElementById("editProfileModal")).show()
    }
  })

  document.getElementById("saveProfileChanges").addEventListener("click", () => {
    const newNom = document.getElementById("editNom").value
    const newPrenom = document.getElementById("editPrenom").value
    const newEmail = document.getElementById("editEmail").value
    const newTelephone = document.getElementById("editTelephone").value
    const newMotDePasse = document.getElementById("editMotDePasse").value

    connectedUser.nom = newNom
    connectedUser.prenom = newPrenom
    connectedUser.email = newEmail
    connectedUser.telephone = newTelephone
    if (newMotDePasse) {
      connectedUser.motdepasse = newMotDePasse
    }

    localStorage.setItem("connectedUser", JSON.stringify(connectedUser))

    const users = JSON.parse(localStorage.getItem("users")) || []
    const userIndex = users.findIndex((user) => user.email === connectedUser.email)
    if (userIndex !== -1) {
      users[userIndex] = connectedUser
      localStorage.setItem("users", JSON.stringify(users))
    }

    displayUserInfo()

    bootstrap.Modal.getInstance(document.getElementById("editProfileModal")).hide()
  })
})

