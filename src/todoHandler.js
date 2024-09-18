function todo(title, notes, date = null, priority = null) {
  var checked = false;
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
  function getDate() {
    return date;
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
  function setDate(info) {
    date = info;
  }
  function setPriority(info) {
    priority = info;
  }
  return {
    getState,
    getTitle,
    checkTodo,
    uncheckTodo,
    getNotes,
    getDate,
    getPriority,
    setNotes,
    setTitle,
    setDate,
    setPriority
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
