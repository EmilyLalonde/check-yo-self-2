class ToDoList {
  constructor(list) {
    this.id = list.id;
    this.title = list.title;
    this.urgent = list.urgent;
    this.tasks = list.tasks || [];
  }
  saveToStorage(newTasks) {
      var stringifiedNewTasks = JSON.stringify(newTasks);
      console.log('string', stringifiedNewTasks);
      localStorage.setItem('lists', stringifiedNewTasks);
  };

  deleteFromStorage(cardId) {
    var updatedList = listArray.filter(function(card){
      return card.id !== cardId;
    })
    console.log('ulist', updatedList);
    this.saveToStorage(updatedList);
  }

  updateUrgent() {
    this.urgent = !this.urgent;
    this.saveToStorage(listArray);
  }

  updateTaskItems() {
  }
}