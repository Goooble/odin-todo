import { createTodo, deleteTodo } from "./todoHandler";
import { format, isAfter, isToday } from "date-fns";
var projectCont = [];
function getProjectCont() {
  return projectCont;
}

function project(projectName) {
  //todos and completed todos the object holds
  var todoCont = [];
  var compCont = [];

  function sortTodo() {
    //this is here coz it changes the todoCont
    todoCont.sort((a, b) => {
      if (a.getDueDate() || b.getDueDate()) {
        //this exists-
        //coz if it doesnt exist, the no dues todos keep shuffling
        if (isAfter(a.getDueDate(), b.getDueDate())) {
          return 1;
        }
        return -1;
      }
    });

    //this is to hold todos with no due date at the bottom
    var numberOfEmpties = todoCont.findIndex((item) => {
      if (item.getDueDate()) {
        return true;
      }
    });
    var noDueArray = todoCont.splice(0, numberOfEmpties);
    noDueArray.forEach((item) => todoCont.push(item));
  }

  function getProjectName() {
    return projectName;
  }

  function addTodo(title, notes, date, priority) {
    todoCont.unshift(createTodo(title, notes, date, priority));
  }

  function removeTodo(todoItem) {
    deleteTodo(todoItem, todoCont);
  }

  function moveTodo(index) {
    //moves completed todo to a completed array
    todoCont[index].checkTodo();

    compCont.unshift(todoCont[index]);
    todoCont.splice(index, 1);
  }

  function moveBackTodo(index) {
    //moves completed todo to the todo array
    compCont[index].uncheckTodo();

    todoCont.unshift(compCont[index]);
    compCont.splice(index, 1);
  }

  function getTodoCont() {
    sortTodo();
    return todoCont;
  }

  function getCompCont() {
    return compCont;
  }

  return {
    addTodo,
    removeTodo,
    getTodoCont,
    getProjectName,
    moveTodo,
    getCompCont,
    moveBackTodo,
    sortTodo,
  };
}

var todayFilter = (function () {
  const { getTodoCont, getProjectName, getCompCont, moveTodo } = project("Today");

  function getTodos(projectArray) {
    getTodoCont().length = 0; //cleans array
    projectArray.forEach((project) => {
      project.getTodoCont().forEach((todo) => {
        if (isToday(todo.getDueDate())) {
          getTodoCont().push(todo);
        }
      });
    });
  }
  return { getTodoCont, getProjectName, getCompCont, getTodos, moveTodo };
})();

function addProject(name) {
  projectCont.unshift(project(name));
}

function deleteProject(project) {
  projectCont.forEach((item, index) => {
    if (project === item) {
      projectCont.splice(index, 1);
    }
  });
}

export { addProject, getProjectCont, deleteProject, todayFilter };
