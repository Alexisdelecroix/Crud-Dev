let modal = document.getElementById("modal");
let modalUpdate = document.getElementById("modalUpdate");
let button = document.getElementById("button");
let closeModal = document.getElementById("closeModal");
let closeModalUpdate = document.getElementById("closeModalUpdate");
const formulaire = document.getElementById("formulaire");

// Ouverture de la modal
button.addEventListener("click", () => {
  modal.classList.add("active");
});

// Fermeture de la modal
closeModal.addEventListener("click", () => {
  modal.classList.remove("active");
});

// Function ajout d'un utilisateur
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

  // Error regex
  let errorNom = document.getElementById("errorNom");
  let errorPrenom = document.getElementById("errorPrenom");
  let errorAdresse = document.getElementById("errorAdresse");
  let errorVille = document.getElementById("errorVille");
  let errorCode_Postal = document.getElementById("errorPostal");
  let errorTel = document.getElementById("errorTel");
  let errorMail = document.getElementById("errorMail");

  let myRegexString = /^[a-zA-Z-\s]+$/;
  let myRegexAdresse = /^[a-zA-Z0-9\s,'-]+$/;
  let myRegexPostal = /^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/;
  let myRegexTel = /^[0-9]{10}$/;
  let myRegexMail = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

  let isFormValid = true;

  if (myRegexString.test(nom) == false || nom.trim() === "") {
    errorNom.innerHTML = "Le nom doit comporter uniquement des lettres";
    errorNom.style.color = "red";
    errorNom.style.fontSize = "13px";
    isFormValid = false;
  } else {
    errorNom.innerHTML = "";
  }

  if (myRegexString.test(prenom) == false || prenom.trim() === "") {
    errorPrenom.innerHTML = "Le prénom doit comporter uniquement des lettres";
    errorPrenom.style.color = "red";
    errorPrenom.style.fontSize = "13px";
    isFormValid = false;
  } else {
    errorPrenom.innerHTML = "";
  }

  if (myRegexAdresse.test(adresse) == false || adresse.trim() === "") {
    errorAdresse.innerHTML = "L'adresse doit comporter uniquement des lettres et chiffres ";
    errorAdresse.style.color = "red";
    errorAdresse.style.fontSize = "13px";
    isFormValid = false;
  } else {
    errorAdresse.innerHTML = "";
  }

  if (myRegexString.test(ville) == false || ville.trim() === "") {
    errorVille.innerHTML = "La ville doit comporter uniquement des lettres";
    errorVille.style.color = "red";
    errorVille.style.fontSize = "13px";
    isFormValid = false;
  } else {
    errorVille.innerHTML = "";
  }

  if (myRegexPostal.test(code_postal) == false || code_postal.trim() === "") {
    errorCode_Postal.innerHTML = "Le code postal doit contenir 5 chiffres";
    errorCode_Postal.style.color = "red";
    errorCode_Postal.style.fontSize = "13px";
    isFormValid = false;
  } else {
    errorCode_Postal.innerHTML = "";
  }

  if (myRegexMail.test(email) == false || email.trim() === "") {
    errorMail.innerHTML = "Le mail doit être valide";
    errorMail.style.color = "red";
    errorMail.style.fontSize = "13px";
    isFormValid = false;
  } else {
    errorMail.innerHTML = "";
  }

  if (myRegexTel.test(telephone) == false || telephone.trim() === "") {
    errorTel.innerHTML = "Le numéro de téléphone doit contenir 10 chiffres";
    errorTel.style.color = "red";
    errorTel.style.fontSize = "13px";
    isFormValid = false;
  } else {
    errorTel.innerHTML = "";
  }

  // Empêche la soumission du formulaire si des champs
  // sont invalides on sort de la function myFunction
  if (!isFormValid) {
    return;
  }

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

    // Affiche le message de succès
    const successMessage = document.getElementById("succes");
    successMessage.style.display = "flex";

    // Masque le message de succès après 1.5 secondes
    setTimeout(() => {
      successMessage.style.display = "none";
      // Réinitialise le formulaire à zéro
      formulaire.reset();
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }, 1500);
  } catch (error) {
    console.error("Erreur lors de l'envoi de la requête", error);
  }
  // Fermeture de la modale
  modal.classList.remove("active");
}
// Fin de la function ajout d'un utilisateur

async function httpGet(url) {
  const query = await fetch(url);

  const response = await query.json();
  return response;
}

// Function afficher les utilisateurs
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

    // Récupération des buttons contenant la classe btnred
    let openModalDelete = document.querySelectorAll(".btnred");

    let modalDelete = document.getElementById("modalDelete");


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

    let closeModalDelete = document.getElementById("non");

    // Suppression de la modal si on click sur NON
    closeModalDelete.addEventListener("click", () => {
      modalDelete.classList.remove("active");
    });

    let deleteUser = document.getElementById("oui");

    // Event quand on click sur OUI 
    deleteUser.addEventListener("click", () => {

      // Récupération de l'id stocker dans l'élement modalDelete
      const userId = modalDelete.dataset.userId;

      try {
        // Requête POST au serveur local avec les données de l'utilisateur
        const response = fetch(`http://localhost:8000/users/${userId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Fermeture de la modal Delete
        modalDelete.classList.remove("active");

        // Affiche le message de succès
        const deleteMessage = document.getElementById("succesDelete");
        deleteMessage.style.display = "block";

        // Masque le message de succès après 1.5 secondes
        setTimeout(() => {
          deleteMessage.style.display = "none";
          // Réinitialise le formulaire à zéro
          formulaire.reset();
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }, 1500);

      } catch (error) {
        console.error("Erreur lors de l'envoi de la requête", error);
      }
    });

    // Fermeture de la modal Update
    closeModalUpdate.addEventListener("click", () => {
      modalUpdate.classList.remove("active");
    });

    // Récupération des buttons contenant la classe btngreen
    let openUpdateModal = document.querySelectorAll(".btngreen");

    openUpdateModal.forEach((element) => {
      element.addEventListener("click", () => {
        // on récupère l'id du button supprimer
        const userId = element.id;

        console.log(userId);

        // Stocker l'ID de l'utilisateur dans l'élément modalUpdate
        modalUpdate.dataset.userId = userId;


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
              // Insertion des données dans le formulaire Update
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

        formulaireUpdate.addEventListener("submit", (event) => {
          event.preventDefault();
          // Création de l'objet userData qui contient les données modifier
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

            modalUpdate.classList.remove("active")

            const updateMessage = document.getElementById("succesUpdate");
            updateMessage.style.display = "block";

            setTimeout(() => {
              updateMessage.style.display = "none";
            }, 1000);

            setTimeout(() => {
              window.location.reload();
            }, 1500);
            console.log(userData);
          }
          catch (error) {
            console.error("Erreur lors de l'envoi de la requête", error);
          }
        });
      });
    });
  });
};
getAllUsers();
