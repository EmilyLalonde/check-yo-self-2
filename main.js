var indicationMsg = document.querySelector('.indication-msg');
var taskTitleInput = document.querySelector('.title-input');
var taskItemInput = document.querySelector('.item-input');
var sidebarTaskField = document.querySelector('.task-generate-list');
var makeTaskBtn = document.querySelector('#make-task-btn');
var clearAllBtn = document.querySelector('#clear-all-btn');
var addTaskBtn = document.querySelector('.add-task-btn')
var cardField = document.querySelector('.card-field');
var tasksArray = [];
var listArray = JSON.parse(localStorage.getItem('lists')) || [];

window.addEventListener('load', toggleMsg);
window.addEventListener('load', recreateTasksCard);
taskItemInput.addEventListener('keyup', preventEmptyTaskGeneration);
taskTitleInput.addEventListener('keyup', makeTaskBtnToggleAbility);
addTaskBtn.addEventListener('click', addTasks);
sidebarTaskField.addEventListener('click', deleteTasksFromSidebar);
clearAllBtn.addEventListener('click', clearAll);
makeTaskBtn.addEventListener('click', cardObjectFactory);
cardField.addEventListener('click', deleteCard);
cardField.addEventListener('click', toggleUrgent)

function cardObjectFactory(e) {
  e.preventDefault();
  var cardObj = new ToDoList({ id: Date.now(), title: taskTitleInput.value, urgent: false, tasks: tasksArray });
  listArray.push(cardObj);
  cardObj.saveToStorage(listArray);
  createTaskCard(cardObj);
  toggleMsg();
};

function recreateTasksCard() {
  listArray = listArray.map(function (oldTask) {
    var restoredTasks = new ToDoList({ id: oldTask.id, title: oldTask.title, urgent: oldTask.urgent, tasks: oldTask.tasks });
    createTaskCard(restoredTasks);
    return restoredTasks;
  })
};

function toggleMsg() {
  if (listArray.length === 0) {
    indicationMsg.innerText = 'Please create a to do list!'
  } else {
    indicationMsg.innerText = '';
  }
};

function clearAll() {
  taskTitleInput.innerHTML = '';
  sidebarTaskField.innerText = '';
};

function preventEmptyTaskGeneration() {
  if (taskItemInput.value === '') {
    addTaskBtn.disabled = true;
  } else {
    addTaskBtn.disabled = false;
  }
};

function makeTaskBtnToggleAbility() {
  if (taskTitleInput.value === '' && taskItemInput.value === '') {
    makeTaskBtn.disbaled = true;
  } else {
    makeTaskBtn.disabled = false;
  }
};

function addTasks(e) {
  e.preventDefault();
  sidebarTaskField.innerHTML +=
    `<div><li class="todo-task-item"><img src="images/delete.svg" alt="circle button with an x through it" class="aside-delete-btn">${taskItemInput.value}</li></div>`
  tasksArray.push(taskItemInput.value);
};

function deleteTasksFromSidebar(e) {
  if (e.target.className === 'aside-delete-btn') {
    var deleteTaskItem = e.target.parentElement;
    deleteTaskItem.remove();
  }
};

function urgentVal(urgent) {
  if (urgent === true) {
    return "images/urgent-active.svg"
  } else {
    return "images/urgent.svg"
  }
}

function createTaskCard(card) {
  var newCard =
    `<article class="card "data-id='${card.id}'>
      <header class="card-header">
        <h2>${card.title}</h2>
      </header>
      <section class="card-task-field">
        <ul class="card-list">
          ${card.tasks.map(function (task) {
      return `<div><img src="images/checkbox.svg" alt="small empty circle"><li class="card-task-items">${task}</li><div>`;
    }).join('')}
        </ul>
      </section>
      <footer class="card-footer">
        <a class="urgent">
          <img src=${urgentVal(card.urgent)} class="urgent-button" id="${card.id}" alt="Lightning urgent Button"><span class="urgent-text">URGENT</span>
        </a>
        <a class="delete">
          <img src="images/delete.svg" class="delete-card-button" alt="Delete Card X Button"><span class="delete-text">DELETE</span>
        </a>
      </footer>
    </article>`
  cardField.insertAdjacentHTML('afterbegin', newCard);
};

function deleteCard(e) {
  if (e.target.className === 'delete-card-button') {
    var card = e.target.parentElement.parentElement.parentElement;
    card.remove();

    var cardId = e.target.closest('.card').dataset.id
    cardId = parseInt(cardId);
    var card = listArray.find(function (card) {
      return card.id === cardId;
    })
    card.deleteFromStorage(cardId);
  }
};

function toggleUrgent(e) {
  if (e.target.className === 'urgent-button') {
    var cardId = e.target.closest('.card').dataset.id;
    cardId = parseInt(cardId);
    var foundCard = listArray.find(function (card) {
      return card.id === cardId;
    })
    foundCard.updateUrgent();
    if (foundCard.urgent === true) {
      document.getElementById(cardId).src = "images/urgent-active.svg"
    } else {
      document.getElementById(cardId).src = "images/urgent.svg"
    }
  }
};
