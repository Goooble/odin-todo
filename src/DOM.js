const todoDisplayCont = document.querySelector("main");
const projectListCont = document.querySelector("aside");


//create the element 
function createDisplayTodo(index) {
  const todoItem = document.createElement("div");
  todoItem.dataset.index = index;
  todoItem.className = "todo-item";
  return todoItem;
}

function createDisplayProject(index) {
  const projectItem = document.createElement("div");
  projectItem.dataset.index = index;
  projectItem.className = "project-item";
  return projectItem;
}

//clear the input box in quick add and project add after one item has been aded
function cleanInputBox(inputBox) {
  inputBox.value = "";
}

//clear the todo and project lists to include new todo's and projects
function cleanList(container) {
  container
    .querySelectorAll(`.${container.className}>*:not(.default-project, .inbox)`)
    .forEach((item) => {
      container.removeChild(item);
    });
}

var displayList = (function () {
  function displayTodo(array) {
    cleanList(todoDisplayCont);
    array.forEach((item, index) => {
      var todoItem = createDisplayTodo(index);
      todoItem.textContent = item.getTitle();
      todoDisplayCont.appendChild(todoItem);
    });
  }

  function displayProject(array) {
    cleanList(projectListCont);
    array.forEach((item, index) => {
      if (index === array.length - 1) {
        return 0;
      }
      var project = createDisplayProject(index);
      project.textContent = item.getProjectName();
      projectListCont.appendChild(project);
    });
  }

  return { displayTodo, displayProject };
})();

//for the add button to switch to input after clicked
function toggleInput() {

  const addProjectBut = document.querySelector(".add-project-but");
  const addProjectInput = document.querySelector("aside input");
  addProjectBut.classList.toggle("show-add-but");
  addProjectInput.classList.toggle("show-input");
}

export { displayList, toggleInput, cleanInputBox };
