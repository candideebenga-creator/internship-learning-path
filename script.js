// Liste des tâches de l'application
const tasks = [];

// Identifiant de la prochaine tâche
let nextTaskId = 1;

// Récupération des éléments HTML
const taskForm = document.querySelector("#task-form");
const taskTitleInput = document.querySelector("#task-title");
const taskDescriptionInput = document.querySelector("#task-description");
const taskPrioritySelect = document.querySelector("#task-priority");

const taskList = document.querySelector("#task-list");
const emptyMessage = document.querySelector("#empty-message");

const searchInput = document.querySelector("#search-input");
const filterSelect = document.querySelector("#filter-select");

const totalCount = document.querySelector("#total-count");
const completedCount = document.querySelector("#completed-count");
const pendingCount = document.querySelector("#pending-count");

function addTask(event) {
    // TODO 1 : Empêcher le comportement par défaut du formulaire.
    event.preventDefault();

    // TODO 2 : Récupérer les valeurs des champs du formulaire.
    const title = taskTitleInput.value;
    const description = taskDescriptionInput.value;
    const priority = taskPrioritySelect.value;

    // On cherche le bouton radio coché AU MOMENT de l'envoi
    const checkedStatus = document.querySelector('input[name="status"]:checked');
    // "1" = terminée -> true, "0" = non terminée -> false
    const isCompleted = checkedStatus.value === "1";

    // TODO 3 : Vérifier que le titre n'est pas vide.

    const logngeurDuTitre = title.length;
    //  title.length est la propriete de la variable title voilà pourquoi on ne la déclare pas

    if (title === "") {
        alert("Le titre est obligatoire");
        return;
    }
     
    if(logngeurDuTitre < 3){
         alert("Le titre doit avoir plus de 3 caracters");
        return;
    }

    // TODO 4 : Créer un objet représentant la nouvelle tâche.
    // L'objet doit contenir : id, title, description, completed, priority.

    const task = {
        id: nextTaskId,
        title: title,
        description: description,
        completed: isCompleted,
        priority: priority
    };

    // TODO 5 : Ajouter la nouvelle tâche dans le tableau tasks.
    tasks.push(task);

    // TODO 6 : Incrémenter nextTaskId.
    nextTaskId++; // nextTaskId + 1;

    // TODO 7 : Réinitialiser le formulaire.
    taskForm.reset();

    // TODO 8 : Actualiser l'affichage et les statistiques.
    renderTasks();
    updateStatistics();

}

function renderTasks(tasksToDisplay = tasks) {
    //let tastdi = tasks;
    // TODO 1 : Vider le contenu actuel de taskList.
    taskList.innerHTML = "";

    console.log("Here is taskList", taskList);
    
    // TODO 2 : Vérifier si la liste est vide et afficher ou masquer emptyMessage.
    console.log("Here is tasksTidDis Before: ", tasksToDisplay);
    if (tasksToDisplay.length === 0) {
        console.log("Here is tasksTidDis: ", tasksToDisplay);
        emptyMessage.hidden = false;
    } else {
        emptyMessage.hidden = true;
    }

    // TODO 3 : Parcourir tasksToDisplay avec une boucle.
    tasksToDisplay.forEach((task) => {


        console.log("My current task: ", task);
        
        // TODO 4 : Pour chaque tâche, créer un élément HTML.
        const li = document.createElement("li");

        // TODO 5 : Afficher le titre, la description et la priorité.
        const title = document.createElement("h3");
        const description = document.createElement("p");
        const priority = document.createElement("span");
        const status = document.createElement("p");

        title.textContent = task.title;
        description.textContent = task.description;
        priority.textContent = `Priorité : ${task.priority}`;

        if (task.completed) {
            status.textContent = "Statut : Terminée";
        } else {
            status.textContent = "Statut : En attente";
        }

        li.appendChild(title);
        li.appendChild(description);
        li.appendChild(priority);
        li.appendChild(status);

        // TODO 6 : Ajouter des boutons pour terminer, modifier et supprimer la tâche.
        const toggleButton = document.createElement("button");
        if (task.completed) {
            toggleButton.textContent = "Remettre en attente";
        } else {
            toggleButton.textContent = "Terminer";
        }
        toggleButton.addEventListener("click", () => {
            toggleTaskStatus(task.id);
        });

        const editButton = document.createElement("button");
        editButton.textContent = "Modifier";
        editButton.addEventListener("click", () => {
            editTask(task.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Supprimer";
        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
        });

        li.appendChild(toggleButton);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        // TODO 7 : Ajouter l'élément créé dans taskList.
        taskList.appendChild(li);
    });

}

function deleteTask(taskId) {
    // TODO 1 : Rechercher la tâche correspondant à taskId.
    // findIndex donne la POSITION de la tâche dans le tableau (ou -1 si absente)
    const index = tasks.findIndex((task) => task.id === taskId);

    // TODO 2 : Vérifier que la tâche existe.
    if (index === -1) {
        return;
    }

    // TODO 3 : La retirer du tableau tasks.
    // splice(position, 1) retire 1 élément à cette position
    tasks.splice(index, 1);

    // TODO 4 : Actualiser l'affichage et les statistiques.
    renderTasks();
    updateStatistics();

}

function toggleTaskStatus(taskId) {
    // TODO 1 : Retrouver la tâche grâce à son identifiant.
    const task = tasks.find((task) => task.id === taskId);

    // TODO 2 : Vérifier que la tâche existe.
    if (task === undefined) {
        return;
    }

    // TODO 3 : Inverser sa valeur completed (true devient false et inversement).
    task.completed = !task.completed;

    // TODO 4 : Actualiser l'affichage et les statistiques.
    renderTasks();
    updateStatistics();

}

function editTask(taskId) {
    // TODO 1 : Retrouver la tâche grâce à son identifiant.
    const task = tasks.find((task) => task.id === taskId);

    // TODO 2 : Vérifier que la tâche existe.
    if (task === undefined) {
        return;
    }

    // TODO 3 : Demander ou afficher les nouvelles valeurs du titre et de la description.
    // Le 2e paramètre de prompt() pré-remplit le champ avec l'ancienne valeur
    const newTitle = prompt("Nouveau titre :", task.title);

    // Si l'utilisateur clique sur "Annuler", prompt() renvoie null
    if (newTitle === null) {
        return;
    }

    const newDescription = prompt("Nouvelle description :", task.description);

    // TODO 4 : Vérifier que le nouveau titre n'est pas vide.
    if (newTitle.trim() === "") {
        alert("Le titre ne peut pas être vide");
        return;
    }

    // TODO 5 : Mettre à jour les informations de la tâche.
    task.title = newTitle.trim();
    if (newDescription !== null) {
        task.description = newDescription.trim();
    }

    // TODO 6 : Actualiser l'affichage.
    renderTasks();

}

function filterTasks(status) {
    // TODO 1 : Créer une liste qui contiendra les tâches filtrées.
    const filteredTasks = [];

    for (const task of tasks) {
        // TODO 2 : Si status vaut "all", afficher toutes les tâches.
        if (status === "all") {
            filteredTasks.push(task);
        }
        // TODO 3 : Si status vaut "completed", conserver les tâches terminées.
        else if (status === "completed" && task.completed === true) {
            filteredTasks.push(task);
        }
        // TODO 4 : Si status vaut "pending", conserver les tâches non terminées.
        else if (status === "pending" && task.completed === false) {
            filteredTasks.push(task);
        }
    }

    // TODO 5 : Appeler renderTasks() avec la liste obtenue.
    renderTasks(filteredTasks);

}

function searchTasks(searchTerm) {
    // TODO 3 : Ne pas tenir compte des majuscules et des minuscules.
    // On met tout en minuscules pour comparer
    const term = searchTerm.toLowerCase();

    // TODO 1 : Parcourir les tâches.
    // TODO 2 : Comparer le titre de chaque tâche avec searchTerm.
    // filter garde seulement les tâches pour lesquelles la condition est vraie
    const foundTasks = tasks.filter((task) => {
        return task.title.toLowerCase().includes(term);
    });

    // TODO 4 : Afficher uniquement les tâches dont le titre correspond à la recherche.
    renderTasks(foundTasks);

}

function updateStatistics() {
    // TODO 1 : Calculer le nombre total de tâches.
    const total = tasks.length;

    // TODO 2 : Calculer le nombre de tâches terminées.
    const completed = tasks.filter((task) => task.completed === true).length;

    // TODO 3 : Calculer le nombre de tâches en attente.
    const pending = total - completed;

    // TODO 4 : Mettre à jour les trois éléments HTML correspondants.
    totalCount.textContent = total;
    completedCount.textContent = completed;
    pendingCount.textContent = pending;

}

//Soumission du formulaire
taskForm.addEventListener("submit", addTask);

// Changement du filtre
filterSelect.addEventListener("change", (event) => {
    // TODO : Appeler filterTasks() avec la valeur sélectionnée.
    filterTasks(event.target.value);
});

// Saisie dans le champ de recherche
searchInput.addEventListener("input", (event) => {
    // TODO : Appeler searchTasks() avec la valeur saisie.
    searchTasks(event.target.value);
});

// Premier affichage au chargement de la page
renderTasks();
updateStatistics();