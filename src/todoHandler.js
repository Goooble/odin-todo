function todo(
  title,
  notes,
  date = undefined,
  priority = "none",
  checklistCont = [],
  state = false
) {
  var newChecklistCont = []
  function createSubtask(checklist = [], state = []){
    newChecklistCont.length = 0;
    checklist.forEach((name, index) => {
      newChecklistCont.unshift(subtask(name, state[index]))
    
    })
    
  }

  function getNewChecklist(){
    return newChecklistCont;
  }

  var checked = state;
  var dueDate = new Date(date);
  if (!date) {
    dueDate = null;
  }
  function getChecklistCont() {
    return checklistCont;
  }
  function removeSubTask(index) {
    checklistCont.splice(index, 1);
    console.log(checklistCont);
  }
  function getTitle() {
    return title;
  }
  function getState() {
    return checked;
  }
  function setState(state){
    checked = state;
  }
  function toggleState() {
    checked = !checked;
  }
  function getNotes() {
    if (!notes) {
      return "";
    }
    return notes;
  }
  function getDueDate() {
    return dueDate;
  }
  function getPriority() {
    if (!priority) {
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

  function editTodo(name, desc, date, label, checklist = []) {
    title = name;
    notes = desc;
    dueDate = new Date(date);
    if (!date) {
      dueDate = null;
    }
    priority = label;
    checklistCont = checklist.slice(0);
  }



  return {
    setState,
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
    toggleState,
    getChecklistCont,
    removeSubTask,
    createSubtask,
    getNewChecklist
  };
}

function subtask(title, state = false){
  var {getTitle, getState, toggleState, setState} = todo(title, null, null, null, null, state)
  setState(state);
  return {getTitle, getState, toggleState}
}



function createTodo(title, notes, date, priority, checklist, state) {
  return todo(title, notes, date, priority, checklist, state);
}

export { createTodo };
