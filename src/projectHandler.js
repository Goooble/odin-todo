import { createTodo, deleteTodo } from "./todoHandler";

var projectCont = [];
function getProjectCont() {
  return projectCont;
}

var activeProject; //to know which project is currently on the main
//screen to quick add todo's

function getActiveProject() {
  return activeProject;
}

function setActiveProject(project) {
  activeProject = project;
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

  function getTodoCont() {
    return todoCont;
  }

  return {
    addTodo,
    removeTodo,
    getTodoCont,
    getProjectName,
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
  deleteProject,
  getActiveProject,
  setActiveProject,
};
