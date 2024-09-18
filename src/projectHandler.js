import { createTodo, deleteTodo } from "./todoHandler";

var projectCont = [];
function getProjectCont() {
  return projectCont;
}





function project(projectName) {
  //todos and completed todos the object holds
  var todoCont = [];
  var compCont = [];

  function getProjectName() {
    return projectName;
  }

  function addTodo(title, description, date, priority) {
    todoCont.unshift(
      createTodo(title, description, date, priority, projectName)
    );
  }

  function removeTodo(todoItem) {
    deleteTodo(todoItem, todoCont);
  }

  function moveTodo(index){//moves completed todo to a different array
    todoCont[index].checkTodo();
    
    compCont.unshift(todoCont[index]);
    todoCont.splice(index, 1);
  }

  function getTodoCont() {
    return todoCont;
  }

  function getCompCont(){
    return compCont;
  }

  return {
    addTodo,
    removeTodo,
    getTodoCont,
    getProjectName,
    moveTodo,
    getCompCont
  };
}

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

export {
  addProject,
  getProjectCont,
  deleteProject
};
