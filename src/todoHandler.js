function todo(title, notes, date = undefined, priority = "none") {
  var checked = false;
  var dueDate = new Date(date);
  if(!date){
    dueDate = null;
  }
  function getTitle() {
    return title;
  }
  function getState() {
    return checked;
  }

  function checkTodo() {
    checked = true;
  }
  function uncheckTodo() {
    checked = false;
  }
  function getNotes() {
    if(!notes){
        return "";
    }
    return notes;
  }
  function getDueDate() {
    return dueDate;
  }
  function getPriority() {
    if(!priority){
        return "none";
    }
    return priority;
  }

  function setTitle(info) {
    title = info;
  }
  function setNotes(info) {
    notes = info;
  }
  function setDueDate(info) {
    dueDate = info;
  }
  function setPriority(info) {
    priority = info;
  }

  function editTodo(name, desc, date, label){
    title = name;
    notes = desc;
    dueDate = new Date(date);
    priority = label;
  }
  return {
    getState,
    getTitle,
    checkTodo,
    uncheckTodo,
    getNotes,
    getDueDate,
    getPriority,
    setNotes,
    setTitle,
    setDueDate,
    setPriority,
    editTodo
  };
}

function createTodo(title, notes, date, priority) {
  return todo(title, notes, date, priority);
}

function deleteTodo(todo, cont) {
  cont.forEach((item, index) => {
    if (item === todo) {
      cont.splice(index, 1);
    }
  });
}

export { createTodo, deleteTodo };
