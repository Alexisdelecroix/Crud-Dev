let modal = document.getElementById("modal");
let modalUpdate = document.getElementById("modalUpdate");

let button = document.getElementById("button");
let closeModal = document.getElementById("closeModal");
let closeModalUpdate = document.getElementById("closeModalUpdate");
const formulaire = document.getElementById("formulaire");

button.addEventListener("click", () => {
  modal.classList.add("active");
  console.log("coucou");
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("active");
});

closeModalUpdate.addEventListener("click", () => {
  modalUpdate.classList.remove("active");
});

formulaire.addEventListener("submit", myFunction);

async function myFunction(event) {
  event.preventDefault();

  // Récupération des données saisies par l'utilisateur
  const nom = document.getElementById("nom").value;
  const prenom = document.getElementById("prenom").value;
  const adresse = document.getElementById("adresse").value;
  const ville = document.getElementById("ville").value;
  const code_postal = document.getElementById("code_postal").value;
  const telephone = document.getElementById("telephone").value;
  const email = document.getElementById("email").value;

  // Création d'un objet contenant les données
  const userData = {
    nom,
    prenom,
    adresse,
    ville,
    code_postal,
    telephone,
    email,
  };

  try {
    // Requête POST au serveur local avec les données de l'utilisateur
    const response = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Conversion de mon objet en chaine de caractère convertit en JSON
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    console.log(data.message); // Affiche le message du serveur

    // Affiche le message de succès
    const successMessage = document.getElementById("succes");
    successMessage.style.display = "block";

    // Masque le message de succès après 3 secondes
    setTimeout(() => {
      successMessage.style.display = "none";
    }, 2000);

    // Réinitialise le formulaire à zéro
    formulaire.reset();

    setTimeout(() => {
      window.location.reload();
    }, 2500);
  } catch (error) {
    console.error("Erreur lors de l'envoi de la requête", error);
  }

  modal.classList.remove("active");
}

async function httpGet(url) {
  const query = await fetch(url);

  const response = await query.json();
  return response;
}

function getAllUsers() {
  let resultat = document.getElementById("resultat");
  const response = httpGet("http://localhost:8000/all");

  response.then((data) => {
    console.log(data);
    data.forEach((element) => {
      resultat.innerHTML += `<tr>
                                <td>${element.nom}</td>
                                <td>${element.prenom}</td>
                                <td>${element.adresse}</td>
                                <td>${element.ville}</td>
                                <td>${element.code_postal}</td>
                                <td>${element.telephone}</td>
                                <td>${element.email}</td>
                                <td><button class="btngreen" id="${element.id}">Modifier </button></td>
                                <td><button class="btnred" id="${element.id}">Supprimer </button></td>
                                </tr>`;
    });

    let openModalDelete = document.querySelectorAll(".btnred");

    openModalDelete.forEach((element) => {
      element.addEventListener("click", () => {
        // on récupère l'id du button supprimer
        const userId = element.id;

        console.log(userId);

        // Stocker l'ID de l'utilisateur dans l'élément modalDelete
        modalDelete.dataset.userId = userId;

        // Ouverture de la modal "voulez vous supprimez un utilisateur"
        modalDelete.classList.add("active");
      });
    });

    let modalDelete = document.getElementById("modalDelete");

    let closeModalDelete = document.getElementById("non");

    closeModalDelete.addEventListener("click", () => {
      modalDelete.classList.remove("active");
    });

    let deleteUser = document.getElementById("oui");

    deleteUser.addEventListener("click", () => {
      const userId = modalDelete.dataset.userId;

      try {
        // Requête POST au serveur local avec les données de l'utilisateur
        const response = fetch(`http://localhost:8000/users/${userId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        modalDelete.classList.remove("active");

        // Affiche le message de succès
        const deleteMessage = document.getElementById("succesDelete");
        deleteMessage.style.display = "block";

        // Masque le message de succès après 3 secondes
        setTimeout(() => {
          deleteMessage.style.display = "none";
        }, 2000);

        // Réinitialise le formulaire à zéro
        formulaire.reset();

        setTimeout(() => {
          window.location.reload();
        }, 2500);
      } catch (error) {
        console.error("Erreur lors de l'envoi de la requête", error);
      }
    });

    let openUpdateModal = document.querySelectorAll(".btngreen");

    openUpdateModal.forEach((element) => {
      element.addEventListener("click", () => {
        // on récupère l'id du button supprimer
        const userId = element.id;

        console.log(userId);

        // Stocker l'ID de l'utilisateur dans l'élément modalDelete
        modalUpdate.dataset.userId = userId;

        // Ouverture de la modal "voulez vous supprimez un utilisateur"
        modalUpdate.classList.add("active");

        try {
          const response = fetch(`http://localhost:8000/one/${userId}`, {
            method: "GET", // Utiliser la méthode GET pour récupérer un utilisateur
            headers: {
              "Content-Type": "application/json",
            }
          });
          response
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              const formulaireUpdate = document.getElementById("formulaireUpdate");
              formulaireUpdate.reset();
              formulaireUpdate.nom.value = data[0].nom
              formulaireUpdate.prenom.value = data[0].prenom
              formulaireUpdate.adresse.value = data[0].adresse
              formulaireUpdate.ville.value = data[0].ville
              formulaireUpdate.telephone.value = data[0].telephone
              formulaireUpdate.email.value = data[0].email
              formulaireUpdate.code_postal.value = data[0].code_postal


            })
            .catch((error) => {
              console.error("Erreur lors de l'obtention des données:", error);
            });
        } catch (error) {
          console.error("Erreur lors de l'envoi de la requête", error);
        }
        formulaireUpdate.addEventListener("submit", () => {

          const userData = {
            nom: formulaireUpdate.nom.value,
            prenom: formulaireUpdate.prenom.value,
            adresse: formulaireUpdate.adresse.value,
            ville: formulaireUpdate.ville.value,
            code_postal: formulaireUpdate.code_postal.value,
            telephone: formulaireUpdate.telephone.value,
            email: formulaireUpdate.email.value
          };

          try {
            const response = fetch(`http://localhost:8000/${userId}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userData),
            });
            console.log(userData);
          } catch (error) {
            console.error("Erreur lors de l'envoi de la requête", error);
          }
        });
      });
    });
  });
};

getAllUsers();
