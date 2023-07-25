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

const getAllUsers = (req, res) => {
   const query = 'SELECT * FROM users';
   conn.query(query, (err, result)=> {
    if (err) {
        console.error("Erreur lors de la récupération des données :" + err);
        res.status(500).json({error : "Erreur lors de la récupération des données"})
    } else{
        res.status(200).json(result)
    }
   })
}

const updateUser = (req, res) => {
    // Extraction de l'ID de l'utilisateur à partir des paramètres de la route
    const userId = req.params.id;

   // Extraction des données du corps de la requête (nom, prénom, adresse, etc...)
    const { nom, prenom, adresse, ville, code_postal, telephone, email } = req.body;

    // Vérifier si l'ID de l'utilisateur est présent dans les paramètres de la route
    if (!userId) {
        return res.status(400).json({
            error: 'ID de l\'utilisateur manquant dans les paramètres de la route',
        });
    }

    // Vérifier si au moins une des propriétés à mettre à jour est fournie dans le corps de la requête
    if (!nom && !prenom && !adresse && !ville && !code_postal && !telephone && !email) {
        return res.status(400).json({
            error: 'Au moins une propriété doit être fournie pour mettre à jour l\'utilisateur',
        });
    }

    // Construction de la requête SQL pour mettre à jour l'utilisateur
    let query = 'UPDATE `users` SET';

    // Tableau pour stocker les valeurs à mettre à jour
    const valuesToUpdate = [];

    // Vérifier chaque propriété et ajouter à la requête SQL si elle est fournie
    if (nom) {
        query += ' `nom` = ?,';
        valuesToUpdate.push(nom);
    }
    if (prenom) {
        query += ' `prenom` = ?,';
        valuesToUpdate.push(prenom);
    }
    if (adresse) {
        query += ' `adresse` = ?,';
        valuesToUpdate.push(adresse);
    }
    if (ville) {
        query += ' `ville` = ?,';
        valuesToUpdate.push(ville);
    }
    if (code_postal) {
        query += ' `code_postal` = ?,';
        valuesToUpdate.push(code_postal);
    }
    if (telephone) {
        query += ' `telephone` = ?,';
        valuesToUpdate.push(telephone);
    }
    if (email) {
        query += ' `email` = ?,';
        valuesToUpdate.push(email);
    }

    // Supprimer la virgule finale de la requête SQL
    query = query.slice(0, -1);

    // Ajouter la condition pour filtrer par l'ID de l'utilisateur
    query += ' WHERE `id` = ?';

    // Ajouter l'ID de l'utilisateur aux valeurs à mettre à jour
    valuesToUpdate.push(userId);

    // Exécuter la requête SQL pour mettre à jour l'utilisateur
    conn.query(query, valuesToUpdate, (err) => {
        if (err) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur');
            res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
        } else {
            res.status(200).json({ message: 'Utilisateur mis à jour' });
        }
    });
};


const deleteUser = (req, res) => {
  // Extraction de l'ID de l'utilisateur à partir des paramètres de la route
  const userId = req.params.id;

   // Vérifier si l'ID de l'utilisateur est présent dans les paramètres de la route
   if (!userId) {
       return res.status(400).json({
           error: 'ID de l\'utilisateur manquant dans les paramètres de la route',
       });
   }
   // Construction de la requête SQL pour supprimer l'utilisateur
   let query = `DELETE FROM users WHERE users.id = ${userId}`;

   // Exécuter la requête SQL pour mettre à jour l'utilisateur
   conn.query(query, (err) => {
       if (err) {
           console.error('Erreur lors de la suppression de l\'utilisateur');
           res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
       } else {
           res.status(200).json({ message: 'Utilisateur supprimer' });
       }
   });
};


module.exports = { 
    createUser, getAllUsers, updateUser, deleteUser
}
