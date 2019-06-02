class ToDoList {
  constructor(list) {
    this.id = list.id;
    this.title = list.title;
    this.urgent = list.urgent;
    this.tasks = list.tasks;
  }
  saveToStorage(newTask) {
      var stringifiedNewTask = JSON.stringify(newTask);
      localStorage.setItem('listArray', stringifiedNewTask);
  };

  deleteFromStorage() {
  }

  updateToDo() {
  }

  updateTaskItems() {
  }
}