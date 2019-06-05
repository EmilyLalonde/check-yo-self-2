var indicationMsg = document.querySelector('.indication-msg');
var taskTitleInput = document.querySelector('.title-input');
var taskItemInput = document.querySelector('.item-input');
var sidebarTaskField = document.querySelector('.task-generate-list');
var makeTaskBtn = document.querySelector('#make-task-btn');
var clearAllBtn = document.querySelector('#clear-all-btn');
var addTaskBtn = document.querySelector('.add-task-btn')
var cardField = document.querySelector('.card-field');
var cardList = document.querySelector('.card-list');
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
cardField.addEventListener('click', toggleUrgent);

function cardObjectFactory(e) {
  e.preventDefault();
  var cardObj = new ToDoList({id: Date.now(), title: taskTitleInput.value, urgent: false});
  listArray.push(cardObj);
  cardObj.saveToStorage(listArray);
  createTaskCard(cardObj);
  toggleMsg();
};

function recreateTasksCard(list) {
  listArray = listArray.map(function(oldTask){
  var restoredTasks = new ToDoList({id: oldTask.id, title: oldTask.title, urgent: false, tasks: list.tasks});
  createTaskCard(restoredTasks);
  return restoredTasks;
  })
};

// function instantiateList() {
//   var taskObjects = []; 
//   for (var i =0; i < tasksArray.length; i++) {
//     var taskItem = {
//       id: Date.now() + 2 + i,
//       item: tasksArray[i],
//       checked: false
//     };
//     taskObjects.push(taskItem);
//   }
//   recreateTasksCard(taskObjects);
//   console.log(taskObjects);
// }

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
  var newCard =
`<article class="card "data-id='${task.id}'>
      <header class="card-header">
        <h2>${task.title}</h2>
      </header>
      <section class="card-task-field">
        <ul class="card-list">
          <img src="images/checkbox.svg" alt="small empty circle">
          <li class="card-task-items">${tasksArray[0]}</li>
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
    cardField.insertAdjacentHTML('afterbegin', newCard);
};
window.addEventListener('load', generateListOnCard);
function generateListOnCard(card) {
  console.log(card);
}
// window.addEventListener('lod', generateList);
// function generateList(card) {
//   var cardList = '';
//   for (var i = 0; i < card.tasks.length; i++) {
//     cardList += `<div><li class="todo-task-item"><img src="images/delete.svg" alt="circle button with an x through it" class="aside-delete-btn">${card.tasks[i].items}</li></div>`;
//   }
//   return cardList;
// };

function deleteCard(e) {
  if(e.target.className === 'delete-card-button'){
    var card = e.target.parentElement.parentElement.parentElement;
    card.remove();
  }
};

function findCard(e) {
  var cardId = e.target.closest('.card').dataset.id;
  cardId = parseInt(cardId);
  var findCardId = listArray.find(function(card){
  return card.id === cardId
  })
  cardId[0].deleteFromStorage(cardId, listArray)
}


function toggleUrgent(e) {
  var urgentId = e.target.closest('.urgent-button').dataset.id;
  urgentId = parseInt(urgentId);
  var matchUrgentId = listArray.find(function(urgent){
  return urgent.id === urgentId;
  })
  var toggleUrgent = e.target;
  if(matchUrgentId.urgent === true) {
    toggleUrgent.src = 'images/urgent-active.svg'
  }else{
    toggleUrgent.src = 'images/urgent.svg'
  }
};

// function toggleStar(e) {
//   if(e.target.classList.contains('star-active')) {
//     var star = e.target.parentElement.parentElement;
//     var starId = star.dataset.id;
//     var storeIdStar = storageArray.find(function(obj) {
//       return obj.id === parseInt(starId);
//     });
//     storeIdStar.updateStar(storageArray);
//     var toggleStar = e.target;
//     if(storeIdStar.star === true) {
//       toggleStar.src = 'images/star-active.svg';
//     } else {
//       toggleStar.src = 'images/star.svg';
//    }
//   }
// };