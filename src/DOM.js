const todoDisplayCont = document.querySelector(".todo-disp-cont");
const projectListCont = document.querySelector("aside");

//create the element
function createDisplayTodo(index) {
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
    .querySelectorAll(`.${container.classList[0]}>*:not(.default-project, .inbox)`)
    .forEach((item) => {
      container.removeChild(item);
    });
}

var display = (function () {
  function displayTodo(array) {
    cleanList(todoDisplayCont);
    array.forEach((item, index) => {
      const todoItem = document.createElement("div");
      todoItem.dataset.index = index;
      todoItem.className = "todo-item";
      todoItem.innerHTML = `<div class="todo-name-cont">
          <input type="checkbox" />
          <p>${item.getTitle()}</p>
        </div>
        <div class="options-cont">edit</div>`;
      todoDisplayCont.appendChild(todoItem);
    });
  }

  function displayDoneTodo(array) {
    const doneDispCont = document.querySelector(".show-done-disp-cont");
    if (doneDispCont) {//so this doesnt run when show done todo hasnt been clicked
      cleanList(doneDispCont);
      array.forEach((item, index) => {
        const todoItem = document.createElement("div");
        todoItem.dataset.index = index;
        todoItem.className = "done-todo-item";
        todoItem.innerHTML = `<div class="todo-name-cont">
          <input type="checkbox" checked/>
          <p>${item.getTitle()}</p>
        </div>
        <div class="options-cont">edit</div>`;
        doneDispCont.appendChild(todoItem);
      });
    }
  }

  function displayProject(array) {
    cleanList(projectListCont);
    array.forEach((item, index) => {
      //to skip over default inbox
      if (index === array.length - 1) {
        return 0;
      }
      const projectDiv = document.createElement("div");
      projectDiv.innerHTML = `<p>${item.getProjectName()}</p><button class="close-proj-but">x</button>`;
      projectDiv.dataset.index = index;
      projectDiv.className = "project-item";
      projectListCont.appendChild(projectDiv);
    });
  }
  function updateProjectHeader(name) {
    const header = document.querySelector("header h1");
    header.textContent = name;
  }

  return { displayTodo, displayProject, updateProjectHeader, displayDoneTodo };
})();

//for the add button to switch to input after clicked
function toggleInput() {
  const addProjectBut = document.querySelector(".add-project-but");
  const addProjectInput = document.querySelector("aside input");
  addProjectBut.classList.toggle("show-add-but");
  addProjectInput.classList.toggle("show-input");
}

function updateViewBox(project, projectArray, doneTodoCont) {
  display.updateProjectHeader(project.getProjectName());
  display.displayTodo(project.getTodoCont());
  display.displayProject(projectArray);
  display.displayDoneTodo(doneTodoCont);//need to put it here so that
  //it not only displays when clicked on show button but also when 
  //a todo is checked i am an accidental genius muahahaha
}

var dialogHandler = (function () {
  const form = document.querySelector("dialog form");
  const title = document.querySelector("dialog #title");
  const dueDate = document.querySelector("dialog #date");
  const priority = document.querySelector("dialog #priority");
  const project = document.querySelector("dialog #project");
  const notes = document.querySelector("dialog #notes");

  function getDiaInput(){
    const returnArray = [title.value, dueDate.value, priority.value, project.value, notes.value];
    form.reset();
    return returnArray;
  }

  return {getDiaInput};
})();

export { toggleInput, cleanInputBox, updateViewBox, dialogHandler };
