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

window.addEventListener('load', windowHelper);
taskItemInput.addEventListener('keyup', preventEmptyTaskGeneration);
taskTitleInput.addEventListener('keyup', makeTaskBtnToggleAbility);
addTaskBtn.addEventListener('click', addTasks);
sidebarTaskField.addEventListener('click', deleteTasksFromSidebar);
clearAllBtn.addEventListener('click', clearAll);
makeTaskBtn.addEventListener('click', cardObjectFactory);
cardField.addEventListener('click', cardFieldHelper);

function windowHelper() {
  toggleMsg()
  recreateTasksCard();
}

function cardFieldHelper() {
  deleteCard();
  toggleUrgent();
}

function cardObjectFactory(e) {
  e.preventDefault();
  var cardObj = new ToDoList({ id: Date.now(), title: taskTitleInput.value, urgent: false, tasks: tasksArray, checked: false });
  listArray.push(cardObj);
  cardObj.saveToStorage(listArray);
  createTaskCard(cardObj);
  toggleMsg();
  clearAll();
};

function recreateTasksCard() {
  listArray = listArray.map(function (oldTask) {
    var restoredTasks = new ToDoList({ id: oldTask.id, title: oldTask.title, urgent: oldTask.urgent, tasks: oldTask.tasks, checked: oldTask.checked });
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
  taskTitleInput.value = '';
  sidebarTaskField.innerHTML = '';
  taskItemInput.value = '';
};

function preventEmptyTaskGeneration() {
  if (taskItemInput.value === '') {
    addTaskBtn.disabled = true;
    addTaskBtn.classList.add('disabled');
  } else {
    addTaskBtn.disabled = false;
    addTaskBtn.classList.remove('disabled');
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

function generateAttributes(urgent) {
  if (urgent === true) {
    articleVal = 'yellow-card';
    srcVal = 'images/urgent-active.svg';
    footerVal = 'yellow-top-border';
  } else {
    articleVal = '';
    srcVal = 'images/urgent.svg';
    footerVal = '';
  }
};

function createTaskCard(card) {
  generateAttributes(card.urgent)
  var newCard =
    `<article class="card ${articleVal}" data-id='${card.id}'>
      <header class="card-header">
        <h2>${card.title}</h2>
      </header>
      <section class="card-task-field">
        <ul class="card-list">
          ${generateList(card)}
        </ul>
      </section>
      <footer class="card-footer ${footerVal}">
        <a class="urgent-button">
          <img src=${srcVal} class="urgent-button" id="${card.id}" alt="Lightning urgent Button"><span class="urgent-text">URGENT</span>
        </a>
        <a class="delete">
          <img src="images/delete.svg" class="delete-card-button" alt="Delete Card X Button"><span class="delete-text">DELETE</span>
        </a>
      </footer>
    </article>`
  cardField.insertAdjacentHTML('afterbegin', newCard);
};

function generateList(card) {
  return card.tasks.map(function (task) {
    return `<div><img src="images/checkbox.svg" alt="small empty circle" class="checkbox" "><li class="card-task-items" data-checked="${task.id}">  ${task}</li><div>`;
  }).join('')
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
    styleUrgency(e, foundCard, cardId)
  }
};

function styleUrgency(e, foundCard, cardId) {
  foundCard.updateUrgent();
  if (foundCard.urgent === true) {
    e.target.closest('.card').classList.add('yellow-card');
    e.target.closest('.card-footer').classList.add('yellow-top-border');
    document.getElementById(cardId).src = 'images/urgent-active.svg';
  } else {
    e.target.closest('.card').classList.remove('yellow-card');
    e.target.closest('.card-footer').classList.remove('yellow-top-border');
    document.getElementById(cardId).src = 'images/urgent.svg';
  }
};
