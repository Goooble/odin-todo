import "./reset.css";
import "./styles.css";
//interface between dom and scripts
import {
  cleanInputBox,
  toggleInput,
  updateViewBox,
  dialogHandler,
} from "./domHandler";
import { addProject, getProjectCont, deleteProject } from "./projectHandler";

var activeProject; //to know which project is currently on the main
function getActiveProject() {
  return activeProject;
}

function setActiveProject(project) {
  activeProject = project;
  updateViewBox(
    getActiveProject(),
    getProjectCont(),
    getActiveProject().getCompCont()
  );
}

const aside = document.querySelector("aside");

//event listeners

//dialog add todos
const addTodoBut = document.querySelector(".add-but");
const dialog = document.querySelector("dialog");
const closeDiaBut = document.querySelector("dialog .close-but");
const inputBox = document.querySelector("header input");
const todosHolder = document.querySelector(".todo-disp-cont");

addTodoBut.addEventListener("click", () => {
  dialog.showModal();
  dialogHandler.updateDiaProjects(getProjectCont());
  dialogHandler.matchInputBox();
});

closeDiaBut.addEventListener("click", () => {
  dialog.close();
});

var editMode = false; //to ensure the submit was done by an edit and not an add
var brokenTodo;
//this works for both editing and adding using the above to variables
dialog.addEventListener("close", () => {
  if (dialog.returnValue === "Submit") {
    //to extract project index value seperately
    const [projectIndex, ...todoInput] = dialogHandler.getDiaInput();
    if (editMode === true) {
      if (getProjectCont()[projectIndex] !== getActiveProject()) {
        //if some other project is selected, the todo gets moved
        getActiveProject()
          .getTodoCont()
          .splice(getActiveProject().getTodoCont().indexOf(brokenTodo), 1);
        getProjectCont()[projectIndex].addTodo(...todoInput);
      } else {
        brokenTodo.editTodo(...todoInput);
      }
      editMode = false;
    } else {
      getProjectCont()[projectIndex].addTodo(...todoInput);
    }
    updateViewBox(
      getActiveProject(),
      getProjectCont(),
      getActiveProject().getCompCont()
    );
    cleanInputBox(inputBox);
    dialog.returnValue = "init"; //resetting this value for the next add
  }
  editMode = false; //if dialog is closed by something other than submit
  //for ex: after editing, user pressed cancel
});

// edit todos
todosHolder.addEventListener("click", (e) => {
  editMode = true;
  if (e.target.classList.contains("edit-but")) {
    dialog.showModal();
    dialogHandler.updateDiaProjects(getProjectCont());
    brokenTodo =
      getActiveProject().getTodoCont()[
        e.target.parentElement.parentElement.dataset.index
      ];
    dialogHandler.editTodoMatch(
      brokenTodo,
      getProjectCont().indexOf(getActiveProject())
    );
  }
});

//quick add todos

inputBox.addEventListener("keydown", quickAdd);

function quickAdd(e) {
  //prevents user from entering blank todos
  if (e.key === "Enter" && inputBox.value !== "") {
    getActiveProject().addTodo(inputBox.value);
    cleanInputBox(inputBox);
    updateViewBox(
      getActiveProject(),
      getProjectCont(),
      getActiveProject().getCompCont()
    );
    //debugging
    console.log(getActiveProject().getProjectName());
    getActiveProject()
      .getTodoCont()
      .forEach((item) => {
        console.log(`--${item.getTitle()}`);
      });
  }
}

//check todo
const showDoneBut = document.querySelector(".show-done");
const doneDispCont = document.querySelector(".done-disp-cont");
todosHolder.addEventListener("click", (e) => {
  if (e.target.tagName === "INPUT") {
    var index = e.composedPath().find((item) => {
      //to get index
      if (item.classList.contains("todo-item")) {
        return true;
      }
    }).dataset.index;
    getActiveProject().moveTodo(index);
    updateViewBox(
      getActiveProject(),
      getProjectCont(),
      getActiveProject().getCompCont()
    );
  }
});

//show done todo
showDoneBut.addEventListener("click", (e) => {
  doneDispCont.classList.toggle("show-done-disp-cont");
  if (doneDispCont.classList.contains("show-done-disp-cont")) {
    updateViewBox(
      getActiveProject(),
      getProjectCont(),
      getActiveProject().getCompCont()
    );
  }
});

//uncheck todo
doneDispCont.addEventListener("click", (e) => {
  if (e.target.tagName === "INPUT") {
    var index = e.composedPath().find((item) => {
      if (item.classList.contains("done-todo-item")) {
        return true;
      }
    }).dataset.index;
    getActiveProject().moveBackTodo(index);
    updateViewBox(
      getActiveProject(),
      getProjectCont(),
      getActiveProject().getCompCont()
    );
  }
});

//add projects
const addProjectBut = document.querySelector(".add-project-but");
const addProjectInput = document.querySelector("aside input");
//to switch the add project button to input
addProjectBut.addEventListener("click", () => {
  toggleInput();
  addProjectInput.focus();
});

//to enter the value in the add project input
addProjectInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && addProjectInput.value !== "") {
    addProject(addProjectInput.value);
    updateViewBox(
      getActiveProject(),
      getProjectCont(),
      getActiveProject().getCompCont()
    );
    cleanInputBox(addProjectInput);
  }
});

//to switch back to show add button
addProjectInput.addEventListener("focusout", () => {
  toggleInput();
});

//default
addProject("Inbox");

addProject("School");

addProject("Work");
getProjectCont()[2].addTodo("inbox - hello");
getProjectCont()[2].addTodo("inbox - wassup");
getProjectCont()[1].addTodo("school - hello");
getProjectCont()[1].addTodo("school - wassup");
getProjectCont()[0].addTodo("work - hello");
getProjectCont()[0].addTodo("work - wassup");

//to select a project to display on the main screen

aside.addEventListener("click", (e) => {
  if(e.target.classList.contains("project-item") || e.target.classList.contains("project-name") ){var projectSelected;
  

  var shortArray = e.composedPath().slice(0, -2);
  //having document and window object in the path messes up the .contains() below

  var projectItem = shortArray.find((item) => {
    //so that even clicking on text which is inside p works
    if (item.classList.contains("project-item")) {
      return true;
    }
  });
  //maybe add eventlistners to individual project-items themselves using for each


  //need an two if's coz inbox doesnt contain a dataset.index
  //because its displayed above and and is a default
  //this was easier than assigning it a dataset
  //but if need arises i might as well assign it
  if (projectItem) {
    projectSelected = getProjectCont()[+projectItem.dataset.index];
    if (e.target.classList.contains("inbox")) {
      projectSelected = getProjectCont()[getProjectCont().length - 1];
    }
    setActiveProject(projectSelected);
  }}
});
//delete project
aside.addEventListener("click", (e) => {
  if (e.target.classList.contains("close-proj-but")) {
    if (confirm("Do you want to delete the project?")) {
      deleteProject(getProjectCont()[e.target.parentElement.dataset.index]);
      setActiveProject(getProjectCont()[getProjectCont().length - 1]);
    }
    //debugger
    // getProjectCont().forEach((item) => {
    //   console.log(item.getProjectName());
    // });
  }
});

//default
setActiveProject(getProjectCont()[getProjectCont().length - 1]);

//debugger
const logger = document.querySelector(".logger");
logger.addEventListener("click", () => {
  console.log("todo details:");
  console.log(getActiveProject().getTodoCont()[0].getTitle());
  console.log(getActiveProject().getTodoCont()[0].getNotes());
  console.log(getActiveProject().getTodoCont()[0].getDate());
  console.log(getActiveProject().getTodoCont()[0].getPriority());

  console.log(getProjectCont()[2].getProjectName());
  console.log("todo");
  getActiveProject()
    .getTodoCont()
    .forEach((item) => {
      console.log(item.getTitle());
      console.log(`--${item.getState()}`);
    });
  console.log("completed below");
  getActiveProject()
    .getCompCont()
    .forEach((item) => {
      console.log(item.getTitle());
      console.log(`--${item.getState()}`);
    });
  console.log("----------");
});
