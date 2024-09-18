import "./reset.css";
import "./styles.css";
//interface between dom and scripts
import {
  cleanInputBox,
  toggleInput,
  updateViewBox
} from "./DOM";
import {
  addProject,
  getProjectCont,
  deleteProject,
} from "./projectHandler";

var activeProject; //to know which project is currently on the main
//screen to quick add todo's
// function updateViewBox(){
//   updateProjectHeader(getActiveProject().getProjectName());
//   displayList.displayTodo(getActiveProject().getTodoCont());
//   displayList.displayProject(getProjectCont());
// }
function getActiveProject() {
  return activeProject;
}

function setActiveProject(project) {
  activeProject = project;
  updateViewBox(getActiveProject(), getProjectCont(), getActiveProject().getCompCont())
}



const inputBox = document.querySelector("header input");
const todosHolder = document.querySelector(".todo-disp-cont");
const showDoneBut = document.querySelector(".show-done");
const doneDispCont = document.querySelector(".done-disp-cont");

const addProjectBut = document.querySelector(".add-project-but");
const addProjectInput = document.querySelector("aside input");

const aside = document.querySelector("aside");

//event listeners
//quick add todos

inputBox.addEventListener("keydown", quickAdd);

function quickAdd(e) {
  //prevents user from entering blank todos
  if (e.key === "Enter" && inputBox.value !== "") {
    getActiveProject().addTodo(inputBox.value);
    cleanInputBox(inputBox);
    updateViewBox(getActiveProject(), getProjectCont(), getActiveProject().getCompCont())
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
todosHolder.addEventListener("click", (e) => {
  if (e.target.tagName === "INPUT") {

    var index = e.composedPath().find((item) => {
      if (item.classList.contains("todo-item")) {
        return true;
      }
    }).dataset.index;
    getActiveProject().moveTodo(index);
    updateViewBox(getActiveProject(), getProjectCont(), getActiveProject().getCompCont())
  }
});

//show done todo
showDoneBut.addEventListener("click", (e) => {
  doneDispCont.classList.toggle("show-done-disp-cont");
  if(doneDispCont.classList.contains("show-done-disp-cont"))
  {updateViewBox(getActiveProject(), getProjectCont(), getActiveProject().getCompCont())}
})

//add projects
//to switch the add project button to input
addProjectBut.addEventListener("click", () => {
  toggleInput();
  addProjectInput.focus();
});

//to enter the value in the add project input
addProjectInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && addProjectInput.value !== "") {
    addProject(addProjectInput.value);
    updateViewBox(getActiveProject(), getProjectCont(), getActiveProject().getCompCont())
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
  var projectSelected;
  //need an two if's coz inbox doesnt contain a dataset.index
  //because its displayed above and and is a default
  //this was easier than assigning it a dataset
  //but if need arises i might as well assign it

  var shortArray = e.composedPath().slice(0, -2);
  //having document and window object in the path messes up the .contains() below
  console.log(shortArray);
  var projectItem = shortArray.find((item) => {
    //so that even clicking on text which is inside p works
    if(item.classList.contains("project-item")){
      return true;
    }
  })
//maybe add eventlistners to individual project-items themselves using for each
  
  if (projectItem) {
    projectSelected = getProjectCont()[+projectItem.dataset.index];
    if (e.target.classList.contains("inbox")) {
      projectSelected = getProjectCont()[getProjectCont().length - 1];
    }
    setActiveProject(projectSelected);
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
