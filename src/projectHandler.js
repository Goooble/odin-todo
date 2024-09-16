import { createTodo, deleteTodo } from "./todoHandler";

var projectCont = [];

function project(projectName) {
  var todoCont = [];
  var compCont = [];

  function getTodoCont(){
    return todoCont
  }

  function getProjectName(){
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

  return { addTodo, removeTodo, getTodoCont, getProjectName };
}

function addProject(name) {
  projectCont.unshift(project(name));
}

function deleteProject(project){
    projectCont.forEach((item, index) => {
        if(project === item){
            projectCont.splice(index, 1);
        }
    })
}

function getProjectCont(){
  return projectCont;
}

export { addProject, getProjectCont, deleteProject };
