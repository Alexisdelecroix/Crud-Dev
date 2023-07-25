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

function myFunction(event) {
    event.preventDefault();

    // let formData = new formData(formulaire)

    // console.log(formData.get(nom));
    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const adresse = document.getElementById("adresse").value;
    const ville = document.getElementById("ville").value;
    const postal = document.getElementById("postal").value;
    const tel = document.getElementById("tel").value;
    const email = document.getElementById("email").value;

console.log(nom);
console.log(prenom);

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




