const todoDisplayCont = document.querySelector("main");
const projectListCont = document.querySelector("aside");


//create the element 
function createDisplayTodo(index) {
  const todoItem = document.createElement("div");
  todoItem.dataset.index = index;
  todoItem.className = "todo-item";
  return todoItem;
}
//bundled this together with display project, easier to work with
// function createDisplayProject(index) {
//   const projectItem = document.createElement("div");
//   const closeBut = document.createElement("button");
//   const projectTitle = document.createElement("p");
//   projectItem.appendChild(projectTitle);
//   closeBut.textContent = "x";
//   projectItem.appendChild(closeBut);
//   return projectItem;
// }

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
    array.forEach((item, index) => {//to skip over default inbox
      if (index === array.length - 1) {
        return 0;
      }
      const projectDiv = document.createElement("div");
      projectDiv.innerHTML = `<p>${item.getProjectName()}</p><button class="close-proj-but">x</button>`
      projectDiv.dataset.index = index;
      projectDiv.className = "project-item";
      projectListCont.appendChild(projectDiv);
    });
  }

  return { displayTodo, displayProject };
})();

function updateProjectHeader(name){
  const header = document.querySelector("header h1");
  header.textContent = name;
}

//for the add button to switch to input after clicked
function toggleInput() {

  const addProjectBut = document.querySelector(".add-project-but");
  const addProjectInput = document.querySelector("aside input");
  addProjectBut.classList.toggle("show-add-but");
  addProjectInput.classList.toggle("show-input");
}

export { displayList, toggleInput, cleanInputBox, updateProjectHeader };
