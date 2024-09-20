import { format } from "date-fns";
const todoDisplayCont = document.querySelector(".todo-disp-cont");
const projectListCont = document.querySelector("aside");

//clear the input box after things have been added in various input boxes
function cleanInputBox(inputBox) {
  inputBox.value = "";
}

//clear the todo and project lists to include new todo's and projects
function cleanList(container) {
  container
    .querySelectorAll(
      `.${container.classList[0]}>*:not(.default-project, .inbox)`
    )
    .forEach((item) => {
      container.removeChild(item);
    });
}

var display = (function () {
  
  function displayTodo(array) {
    cleanList(todoDisplayCont);
    array.forEach((item, index) => {
      const todoItem = document.createElement("div");
      todoItem.dataset.index = index; //to keep track off todos in the scripts
      todoItem.className = "todo-item";
      var displayDate = "";//so that no duedates get displayed as empty string
      //and not as NaN
      if(item.getDueDate()){
        displayDate = format(item.getDueDate(), "dd-MM-yyyy");
      }
      // if(item.getDueDate()){
      //   displayDate = format(item.getDueDate(), "DD/MM/YYYY");
      // }
      todoItem.innerHTML = `<div class="todo-name-cont">
          <input type="checkbox" />
          <div class="todo-header">
            <p>${item.getTitle()}</p>
            <p class = "todo-notes">${item.getNotes()}</p>
          </div>
        </div>
        <div class="options-cont">
          <p class="todo-date">${displayDate}</p>
          <button class="edit-but">Edit</button>
        </div>`;
      todoDisplayCont.appendChild(todoItem);
    });
  }

  function displayDoneTodo(array) {
    const doneDispCont = document.querySelector(".show-done-disp-cont");
    if (doneDispCont) {
      //so this doesnt run when show done todo hasnt been clicked
      cleanList(doneDispCont);
      array.forEach((item, index) => {
        const todoItem = document.createElement("div");
        todoItem.dataset.index = index;
        todoItem.className = "done-todo-item";
        todoItem.innerHTML = `<div class="todo-name-cont">
          <input type="checkbox" checked/>
          <p>${item.getTitle()}</p>
        </div>`;
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
      projectDiv.innerHTML = `<p class="project-name">${item.getProjectName()}</p><button class="close-proj-but">x</button>`;
      projectDiv.dataset.index = index;
      projectDiv.className = "project-item";
      projectListCont.appendChild(projectDiv);
    });
  }
  function updateProjectHeader(name) {
    //the todo view screen header
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

function updateViewBox(projectName,todoArray, projectArray, doneTodoCont) {
  display.updateProjectHeader(projectName);
  display.displayTodo(todoArray);
  display.displayProject(projectArray);
  display.displayDoneTodo(doneTodoCont); //need to put it here so that
  //it not only displays when clicked on show button but also when
  //a todo is checked i am an accidental genius muahahaha
}

var dialogHandler = (function () {
  const quickInput = document.querySelector("#add-quick");
  const form = document.querySelector("dialog form");
  const title = document.querySelector("dialog #title");
  const dueDate = document.querySelector("dialog #date");
  const priority = document.querySelector("dialog #priority");
  const project = document.querySelector("dialog #project");
  const notes = document.querySelector("dialog #notes");

  function updateDiaProjects(projectArray, activeProjectIndex) {
    //this is the project select option in dialog
    cleanList(project);
    //reversingso the appends happen in the same order
    //-as the projects displayed in the sidebar
    for (let item of projectArray) {
      const option = document.createElement("option");
      option.value = `${projectArray.indexOf(item)}`; //to access proper projects
      option.textContent = item.getProjectName();
      if (projectArray.indexOf(item) === activeProjectIndex) {
        option.setAttribute("selected", true); //to set active project as default
        //-in the options
      }
      project.appendChild(option);
    }
  }

  function matchInputBox() {
    //so that the text already entered in quick add
    //is the same when dialog is open
    title.value = quickInput.value;
  }

  function getDiaInput() {
    const returnArray = [
      +project.value,
      title.value,
      notes.value,
      dueDate.value,
      priority.value,
    ];
    form.reset();
    //making sure only domHandler can access the.. well DOM
    return returnArray;
  }

  function editTodoMatch(todo, projectIndex) {
    //when clicked on edit, same dialog box opens up
    //this acquires the value of the todo being edited in the dialog
    title.value = todo.getTitle();
    dueDate.value = todo.getDueDate();
    priority.value = todo.getPriority();
    notes.value = todo.getNotes();
    project.value = projectIndex;
  }

  return { getDiaInput, editTodoMatch, updateDiaProjects, matchInputBox };
})();

export { toggleInput, cleanInputBox, updateViewBox, dialogHandler };
