class ToDoList {
  constructor(list) {
    this.id = list.id;
    this.title = list.title;
    this.urgent = list.urgent;
    this.tasks = list.tasks || [];
  }
  saveToStorage(newTask) {
      var stringifiedNewTask = JSON.stringify(newTask);
      localStorage.setItem('lists', stringifiedNewTask);
  };

  deleteFromStorage() {
    
  }

  updateUrgent(listArray) {
    this.urgent = !this.urgent;
    this.saveToStorage(listArray);
  }

  updateTaskItems() {
  }
}