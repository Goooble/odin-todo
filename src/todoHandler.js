function todo(title, notes, date = undefined, priority = "none", checklistCont = []) {
  var checked = false;
  var dueDate = new Date(date);
  if(!date){
    dueDate = null;
  }
  function getChecklistCont(){
    return checklistCont
  }
  function removeSubTask(index){
    checklistCont.splice(index, 1);
    console.log(checklistCont);
  
  }
  function getTitle() {
    return title;
  }
  function getState() {
    return checked;
  }
  function setState(bool){
    checked = bool;
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

  function editTodo(name, desc, date, label, checklist = []){
    title = name;
    notes = desc;
    dueDate = new Date(date);
    if(!date){
      dueDate = null;
    }
    priority = label;
    checklistCont = checklist.slice(0);
  }
  return {
    getState,
    getTitle,
    getNotes,
    getDueDate,
    getPriority,
    setNotes,
    setTitle,
    setDueDate,
    setPriority,
    editTodo,
    setState,
    getChecklistCont,
    removeSubTask
  };
}

function createTodo(title, notes, date, priority, checklist) {
  return todo(title, notes, date, priority, checklist);
}


export { createTodo };
