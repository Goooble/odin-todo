const inputBox = document.querySelector("header input");
const todoDisplayCont = document.querySelector("main");
const projectListCont = document.querySelector("aside");

function createDisplayTodo() {
  const todoItem = document.createElement("div");
  todoItem.className = "todo-item";
  return todoItem;
}

function createDisplayProject() {
  const projectItem = document.createElement("button");
  projectItem.className = "project-item";
  return projectItem;
}
function cleanInputBox(inputBox) {
  inputBox.value = "";
}
function cleanList(container) {
  container
    .querySelectorAll(`.${container.className}>*:not(.default-project, .inbox)`)
    .forEach((item) => {
      container.removeChild(item);
    });
}

var displayTodoList = (function () {
  function displayTodo(array) {
    cleanList(todoDisplayCont);
    array.forEach((item) => {
      var todoItem = createDisplayTodo();
      todoItem.textContent = item.getTitle();
      todoDisplayCont.appendChild(todoItem);
    });
  }

  return { displayTodo };
})();

var displayProjectList = (function () {
  const addProjectBut = document.querySelector(".add-project-but");
  const addProjectInput = document.querySelector("aside input");

  function displayProject(array) {
    cleanList(projectListCont);
    array.forEach((item, index) => {
      if (index === array.length - 1) {
        return 0;
      }
      var project = createDisplayProject();
      project.textContent = item.getProjectName();
      projectListCont.appendChild(project);
    });
  }

  return { displayProject };
})();

var addProjectHandler = (function () {
  const addProjectBut = document.querySelector(".add-project-but");
  const addProjectInput = document.querySelector("aside input");

  function toggleInput() {
    addProjectBut.classList.toggle("show-add-but");
    addProjectInput.classList.toggle("show-input");
  }

  return { toggleInput };
})();

export {
  displayTodoList,
  displayProjectList,
  addProjectHandler,
  cleanInputBox,
};
