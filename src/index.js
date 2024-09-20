import "./reset.css";
import "./styles.css";


//interface between dom and scripts
import {
  cleanInputBox,
  toggleInput,
  updateViewBox,
  dialogHandler,
} from "./domHandler";
import { addProject, getProjectCont, deleteProject, todayFilter } from "./projectHandler";

var activeProject; //to know which project is currently on the main
function getActiveProject() {
  return activeProject;
}


const quickAddCont = document.querySelector(".quick-add-cont")
function updateScreen(){
  todayFilter.getTodos(getProjectCont().slice(0));//so that quck adding in-
  // today filter is immediately reflected
  //well actually, i am gonna remove the option to add to today coz its really messy

  if(getActiveProject() === todayFilter){
    //removes quick input box
    quickAddCont.classList.add("today-filter-show");
  }else{
    quickAddCont.classList.remove("today-filter-show")
    getActiveProject().sortTodo();
  }
  
  //takes in lot of params, so i thought this would be easier
  updateViewBox(
    //slicing this so that a copy is passed, just-
    //to make sure it isnt changed somehow though it-
    //shouldnt normally happen lets see
    getActiveProject().getProjectName(),
    getActiveProject().getTodoCont().slice(0),
    getProjectCont().slice(0),
    getActiveProject().getCompCont().slice(0)
  );
}

function setActiveProject(project) {
  activeProject = project;
  updateScreen();
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
  dialogHandler.updateDiaProjects(getProjectCont().slice(0), getProjectCont().indexOf(getActiveProject()));
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
    updateScreen();
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
    dialogHandler.updateDiaProjects(getProjectCont());//it works without second value-
    //as editTodoMatch below used projectvalue(index) to get the default option in dia
    brokenTodo =
      getActiveProject().getTodoCont()[
        e.target.parentElement.parentElement.dataset.index
      ];
      console.log(brokenTodo)
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
    updateScreen();
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
    updateScreen();
  }
});

//show done todo
showDoneBut.addEventListener("click", (e) => {
  doneDispCont.classList.toggle("show-done-disp-cont");
  if (doneDispCont.classList.contains("show-done-disp-cont")) {
    updateScreen();
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
    updateScreen();
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
    cleanInputBox(addProjectInput);
    updateScreen();
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
getProjectCont()[2].addTodo(
  "inbox - hello",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus animi consequuntur repudiandae debitis perspiciatis molestias quibusdam ad molestiae fuga libero. Maxime accusamus quisquam illum veniam expedita omnis enim eligendi sapiente?",
  "2024-09-20"
);
getProjectCont()[2].addTodo("inbox - wassup", "");
getProjectCont()[2].addTodo("school - hello", "");
getProjectCont()[2].addTodo("school - wassup", "");
getProjectCont()[2].addTodo("work - hello", "");
getProjectCont()[2].addTodo("work - wassup", "");

//to select a project to display on the main screen

aside.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("project-item") ||
    e.target.classList.contains("project-name")
  ) {
    var projectSelected;

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
      if (e.target.classList.contains("today-filter")) {
        projectSelected = todayFilter;
        
      }
      setActiveProject(projectSelected);
    }
  }
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
  console.log(displayTodoArray[0].getTitle());
  console.log(getActiveProject().getTodoCont()[0].getTitle());
  // console.log("todo details:");
  // console.log(getActiveProject().getTodoCont()[0].getTitle());
  // console.log(getActiveProject().getTodoCont()[0].getNotes());
  // console.log(getActiveProject().getTodoCont()[0].getDate());
  // console.log(getActiveProject().getTodoCont()[0].getPriority());

  // console.log(getProjectCont()[2].getProjectName());
  // console.log("todo");
  // getActiveProject()
  //   .getTodoCont()
  //   .forEach((item) => {
  //     console.log(item.getTitle());
  //     console.log(`--${item.getState()}`);
  //   });
  // console.log("completed below");
  // getActiveProject()
  //   .getCompCont()
  //   .forEach((item) => {
  //     console.log(item.getTitle());
  //     console.log(`--${item.getState()}`);
  //   });
  // console.log("----------");
});


//show notes
const todoHead = document.querySelector(".todo-header");

todosHolder.addEventListener("click", (e) => {
  var path = e.composedPath().slice(0, -2);
  var todo = path.find((item) => {
    if (item.classList.contains("todo-item")) {
      return true;
    }
  });
  if (todo) {
    var notesCont = todo.querySelector(".todo-notes");
    notesCont.classList.toggle("show-notes");
  }
});
