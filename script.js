document.addEventListener('DOMContentLoaded', function() {
    afficherDonnees();

    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent form from submitting

        if (!validateForm()) {
            return;
        }

        let libelle = document.getElementById('libelle').value;
        let categorie = document.getElementById('categorie').value;
        let message = document.getElementById('message_descriptif').value;

        let idee = {
            libelle: libelle,
            categorie: categorie,
            message: message
        };

        // Stocker les données dans localStorage
        let idees = JSON.parse(localStorage.getItem('idees')) || [];
        idees.push(idee);
        localStorage.setItem('idees', JSON.stringify(idees));

        // Ajouter la nouvelle idée dans la table
        ajouterLigneTable(idee);

        // Reset form
        document.querySelector('form').reset();
    });
});

function validateForm() {
    let libelle = document.getElementById('libelle').value;
    let categorie = document.getElementById('categorie').value;
    let message = document.getElementById('message_descriptif').value;
    let isValid = true;

    if (libelle.trim() === "") {
        document.getElementById('errorLibelle').textContent = "Le champ libellé est requis.";
        isValid = false;
    } else {
        document.getElementById('errorLibelle').textContent = "";
    }

    if (categorie === "Choisissez une catégorie") {
        document.getElementById('errorCategorie').textContent = "Le champ catégorie est requis.";
        isValid = false;
    } else {
        document.getElementById('errorCategorie').textContent = "";
    }

    return isValid;
}

function ajouterLigneTable(idee) {
    let table = document.getElementById('crudTable').getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();

    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);

    cell1.textContent = idee.libelle;
    cell2.textContent = idee.categorie;
    cell3.textContent = idee.message;
}

function afficherDonnees() {
    let idees = JSON.parse(localStorage.getItem('idees')) || [];

    idees.forEach(function(idee) {
        ajouterLigneTable(idee);
    });
}
