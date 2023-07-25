let modal = document.getElementById("modal")
let button = document.getElementById("button")
let closeModal = document.getElementById("closeModal")
let formulaire = document.getElementById("formulaire")


button.addEventListener("click", () => {
    modal.classList.add("active")
    console.log("coucou");
})

closeModal.addEventListener("click", () => {
modal.classList.remove("active")
})

formulaire.addEventListener("submit", () => {

    

})

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




