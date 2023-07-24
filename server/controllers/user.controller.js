const mysql = require('mysql');

// Connexion à la BDD
const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

// Enregistrer un nouvelle utilisateur 
const createUser = (req, res) => {
      // Extraction des données du corps de la requête (nom, prénom, adresse, etc...)
    const {nom, prenom, adresse, ville, code_postal, telephone, email} = req.body;

    // Vérifier si les champs sont remplis 
    if (!nom || !prenom || !adresse || !ville || !code_postal || !telephone || !email) {
        return res.status(400).json({
            error : 'Données incorrect'
        })
    }
    const query = 'INSERT INTO `users`(`nom`, `prenom`, `adresse`, `ville`, `code_postal`, `telephone`, `email`) VALUES (?, ?, ?, ?, ?, ?, ?)';
    conn.query(query, [nom, prenom, adresse, ville, code_postal, telephone, email], (err) => {
        if (err) {
            console.error('erreur')
            res.status(500).json({error: 'erreur'})
        } else {
            res.status(200).json({message: 'utilisateur enregistré'});
        }
    })
}




module.exports = { 
    createUser
}
