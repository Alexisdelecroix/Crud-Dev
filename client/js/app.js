let modal = document.getElementById("modal")
let button = document.getElementById("button")
let closeModal = document.getElementById("closeModal")
const formulaire = document.getElementById("formulaire")


button.addEventListener("click", () => {
    modal.classList.add("active")
    console.log("coucou");
})

closeModal.addEventListener("click", () => {
modal.classList.remove("active")
})

formulaire.addEventListener("submit", myFunction)

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
        const response = await fetch('http://localhost:8000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
        }, 3000);
 
       
    } catch (error) {
        console.error('Erreur lors de l\'envoi de la requête', error);
    }
    
modal.classList.remove("active")
}

async function httpGet(url) {
    const query = await fetch(url);

    const response = await query.json();
    return response;
}

function getAllUsers() {
    let resultat = document.getElementById("resultat")
    const response = httpGet('http://localhost:8000/all');

    response.then((data) => {
        console.log(data);
            data.forEach(element => {
                resultat.innerHTML += `<tr>
                                <td>${element.nom}</td>
                                <td>${element.prenom}</td>
                                <td>${element.adresse}</td>
                                <td>${element.ville}</td>
                                <td>${element.code_postal}</td>
                                <td>${element.telephone}</td>
                                <td>${element.email}</td>
                                <td><button class="btngreen">Modifier </button></td>
                                <td><button class="btnred">Supprimer </button></td>
                                </tr>`
            });
    })
}

getAllUsers();




