import { createTodo, deleteTodo } from "./todoHandler";
import { format, isAfter, isToday } from "date-fns";
var projectCont = [];
function getProjectCont() {
  return projectCont;
}

function project(projectName) {
  //todos and completed todos the object holds
  var allTodo = []
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
    allTodo.unshift(createTodo(title, notes, date, priority));
  }

  function removeTodo(todoItem) {
    deleteTodo(todoItem, allTodo);
  }

  function checkTodo(todo) {
    todo.setState(true);
  }
  function uncheckTodo(todo) {
    todo.setState(false);
  }

  function verifyCheck() {

    allTodo.forEach((item) => {
      compCont.length = 0;
      todoCont.length = 0;
      if (item.getState() === true) {
        console.log("caled")
        compCont.push(item);
      }else {
        todoCont.push(item)
      }
    });

    // //moves completed todo to a completed array
    // todoCont.forEach((item, index) => {
    //   if (item.getState() === true) {
    //     console.log("called")
    //     compCont.unshift(item);
    //     todoCont.splice(index, 1);
    //   }
    // });

    // //moves unchecked todo to the todo array
    // compCont.forEach((item, index) => {
    //   if (item.getState() === false) {
    //     console.log("called");
    //     todoCont.unshift(item);
    //     compCont.splice(index, 1);
    //   }
    // });
  }

  function getAllTodo(){
    return allTodo;
  }

  function getTodoCont() {
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
    verifyCheck,
    getCompCont,
    sortTodo,
    checkTodo,
    uncheckTodo,
    getAllTodo
  };
}

var todayFilter = (function () {
  const {
    getTodoCont,
    getProjectName,
    getCompCont,
    checkTodo,
    uncheckTodo,
  } = project("Today");

  var allTodo = [];

  function getTodos(projectArray) {
    allTodo.splice(0); //cleans array
    projectArray.forEach((project) => {
      project.getTodoCont().forEach((todo) => {
        if (isToday(todo.getDueDate())) {
          allTodo.push(todo);
        }
      });
    });
  }

  function verifyCheck() {
    //alltodo and then sliding todos down to todoCont and CompCOnt should be how projects actually work
    //TODO
    allTodo.forEach((item) => {
      getCompCont().length = 0;
      getTodoCont().length = 0;
      if (item.getState() === true) {
        getCompCont().push(item);
      }else {
        getTodoCont().push(item)
      }
    });
  }

  return {
    getTodoCont,
    getProjectName,
    getCompCont,
    getTodos,
    verifyCheck,
    checkTodo,
    uncheckTodo,
  };
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
