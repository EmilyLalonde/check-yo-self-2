var indicationMsg = document.querySelector('.indication-msg');
var taskTitleInput = document.querySelector('.title-input');
var taskItemInput = document.querySelector('.item-input');
var sidebarTaskField = document.querySelector('.task-generate-list');
var makeTaskBtn = document.querySelector('#make-task-btn');
var clearAllBtn = document.querySelector('#clear-all-btn');
var addTaskBtn = document.querySelector('.add-task-btn')
var tasksArray = [];
var listArray = JSON.parse(localStorage.getItem('lists')) || [];

window.addEventListener('load', toggleMsg);
taskItemInput.addEventListener('keyup', preventEmptyTaskGeneration);
taskTitleInput.addEventListener('keyup', makeTaskBtnToggleAbility);
addTaskBtn.addEventListener('click', addTasks);
sidebarTaskField.addEventListener('click', deleteTasksFromSidebar);
clearAllBtn.addEventListener('click', clearAll);
makeTaskBtn.addEventListener('click', cardObjectFactory);

function cardObjectFactory() {
  var cardObj = new ToDoList({id: Date.now(), title: taskTitleInput.value, urgent: false});
  listArray.push(cardObj);
  cardObj.saveToStorage(listArray);
  createTaskCard(cardObj);
};

function toggleMsg() {
  if(listArray.length === 0) {
    indicationMsg.innerText = 'Please create a to do list!'
  }else{
    indicationMsg.innerText = '';
  }
};

function clearAll() {
  taskTitleInput.innerHTML = '';
  sidebarTaskField.innerText = '';
};

function preventEmptyTaskGeneration() {
  if(taskItemInput.value === ''){
    addTaskBtn.disabled= true;
  }else{
    addTaskBtn.disabled= false;
  }
};

function makeTaskBtnToggleAbility() {
  if(taskTitleInput.value === '' && taskItemInput.value === ''){
    makeTaskBtn.disbaled = true;
  }else{
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
  if(e.target.className === 'aside-delete-btn') {
    var deleteTaskItem = e.target.parentElement;
    deleteTaskItem.remove();
  }
};

function createTaskCard(task) {
`<article data-id='${task.id}'>
      <header class="card-header">
        <h2>${task.title}</h2>
      </header>
      <section class="card-task-field">
        <ul class="card-list">
          <img src="images/checkbox.svg" alt="small empty circle">
          <li class="card-task-items"></li>
        </ul>
      </section>
      <footer class="card-footer">
        <a class="urgent-button">
          <img src="images/urgent.svg" class="urgent-button" alt="Lightning urgent Button"><span class="urgent-text">URGENT</span>
        </a>
        <a class="delete">
          <img src="images/delete.svg" class="delete-card-button" alt="Delete Card X Button"><span class="delete-text">DELETE</span>
        </a>
      </footer>
    </article>`
};

// addTasks(task)