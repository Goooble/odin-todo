import "./reset.css";
import "./styles.css";
//interface between dom and scripts
import {
  cleanInputBox,
  displayList,
  toggleInput,
  updateProjectHeader,
} from "./DOM";
import {
  addProject,
  getProjectCont,
  getActiveProject,
  setActiveProject,
} from "./projectHandler";

//event listeners
//quick add todos
const inputBox = document.querySelector("header input");
inputBox.addEventListener("keydown", quickAdd);

function quickAdd(e) {
  if (e.key === "Enter" && inputBox.value !== "") {
    //prevents user from entering blank todos
    getActiveProject().addTodo(inputBox.value);
    cleanInputBox(inputBox);
    displayList.displayTodo(getActiveProject().getTodoCont());
    //debugging
    console.log(getActiveProject().getProjectName());
    getActiveProject()
      .getTodoCont()
      .forEach((item) => {
        console.log(`--${item.getTitle()}`);
      });
  }
}

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
    displayList.displayProject(getProjectCont());
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
const aside = document.querySelector("aside");
aside.addEventListener("click", (e) => {
  var projectSelected;
  //need an two if's coz inbox doesnt contain a dataset 
  //because its displayed above and and is a default 
  //this was easier than assigning it a dataset
  //but if need arises i might as well assign it 
  if (e.target.classList.contains("inbox")) {
    console.log("inbox selected");
    projectSelected = getProjectCont()[getProjectCont().length - 1];
  } else if (e.target.classList.contains("project-item")) {
    projectSelected = getProjectCont()[e.target.dataset.index];
    console.log(`${e.target} selected`);
  }
  setActiveProject(projectSelected);
  displayList.displayTodo(projectSelected.getTodoCont());
//the title on the main screen of the project you are viewing
  updateProjectHeader(projectSelected.getProjectName());
  
});

displayList.displayProject(getProjectCont());
setActiveProject(getProjectCont()[getProjectCont().length - 1]);
