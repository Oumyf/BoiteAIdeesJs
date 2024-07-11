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
            message: message,
            approbations: 0,
            desapprobations: 0
        };

        // Stocker les données dans localStorage
        let idees = JSON.parse(localStorage.getItem('idees')) || [];
        idees.push(idee);
        localStorage.setItem('idees', JSON.stringify(idees));

        // Ajouter la nouvelle idée dans la table
        ajouterLigneTable(idee, idees.length - 1);

        // Reset form
        document.querySelector('form').reset();
    });
});

function validateForm() {
    let libelle = document.getElementById('libelle').value;
    let categorie = document.getElementById('categorie').value;
    let isValid = true;

    if (libelle.trim() === "") {
        document.getElementById('errorLibelle').textContent = "Le champ libellé est requis.";
        isValid = false;
    } 
    else {
        document.getElementById('errorLibelle').textContent = "";
    }

    if (categorie === "Choisissez une catégorie") {
        document.getElementById('errorCategorie').textContent = "Le champ catégorie est requis.";
        isValid = false;
    } else {
        document.getElementById('errorCategorie').textContent = "";
    }

    if (isValid) {
        document.getElementById('myform').style.display = 'none';
        document.getElementById('container').style.display = 'block';
        setTimeout(function() {
            window.location.href = 'index.html';
        }, 2000);
        }
        else{            document.getElementById('myform').style.display = 'none';
            document.getElementById('container1').style.display = 'block';
            setTimeout(function() {
                window.location.href = 'index.html';
            }, 2000);
    }}
    

function ajouterLigneTable(idee, index) {
    let table = document.getElementById('crudTable').getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();

    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);
    let cell4 = newRow.insertCell(3);
    let cell5 = newRow.insertCell(4);
    let cell6 = newRow.insertCell(5);

    cell1.textContent = idee.libelle;
    cell2.textContent = idee.categorie;
    cell3.textContent = idee.message;
    cell4.textContent = idee.approbations;
    cell5.textContent = idee.desapprobations;

    let approbationButton = document.createElement('button');
    approbationButton.textContent = 'Approuver';
    approbationButton.addEventListener('click', function() {
        idee.approbations++;
        updateLocalStorage(index, idee);
        afficherDonnees();
    });

    let desapprobationButton = document.createElement('button');
    desapprobationButton.textContent = 'Désapprouver';
    desapprobationButton.addEventListener('click', function() {
        idee.desapprobations++;
        updateLocalStorage(index, idee);
        afficherDonnees();
    });

    let suppressionButton = document.createElement('button');
    suppressionButton.textContent = 'Supprimer';
    suppressionButton.addEventListener('click', function() {
        supprimerIdee(index);
    });

    let actionsDiv = document.createElement('div');
    actionsDiv.classList.add('actions');
    actionsDiv.appendChild(approbationButton);
    actionsDiv.appendChild(desapprobationButton);
    actionsDiv.appendChild(suppressionButton);

    cell6.appendChild(actionsDiv);
}

function afficherDonnees() {
    let table = document.getElementById('crudTable').getElementsByTagName('tbody')[0];
    table.innerHTML = ''; // Clear existing rows
    let idees = JSON.parse(localStorage.getItem('idees')) || [];

    idees.forEach(function(idee, index) {
        ajouterLigneTable(idee, index);
    });
}

function updateLocalStorage(index, updatedIdee) {
    let idees = JSON.parse(localStorage.getItem('idees')) || [];
    idees[index] = updatedIdee;
    localStorage.setItem('idees', JSON.stringify(idees));
}

function supprimerIdee(index) {
    let idees = JSON.parse(localStorage.getItem('idees')) || [];
    idees.splice(index, 1);
    localStorage.setItem('idees', JSON.stringify(idees));
    afficherDonnees();
}