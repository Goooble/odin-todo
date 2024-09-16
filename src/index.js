import "./reset.css";
import "./styles.css";
//interface between dom and scripts
import { cleanInputBox, displayList, toggleInput } from "./DOM";
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
    getActiveProject().addTodo(inputBox.value);
    cleanInputBox(inputBox);
    displayList.displayTodo(getActiveProject().getTodoCont());
    console.log(getActiveProject().getProjectName());
    getActiveProject().getTodoCont().forEach((item) => {
      console.log(`--${item.getTitle()}`);
    })
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
addProject("inbox");

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
  if (e.target.classList.contains("inbox")) {
    console.log("inbox selected")
    setActiveProject(getProjectCont()[getProjectCont().length - 1]);
    displayList.displayTodo(getProjectCont()[getProjectCont().length - 1].getTodoCont())
  } else if(e.target.classList.contains("project-item")) {
    console.log(`${e.target} selected`)
    setActiveProject(getProjectCont()[e.target.dataset.index]);
    displayList.displayTodo(getProjectCont()[e.target.dataset.index].getTodoCont());
  }

});


displayList.displayProject(getProjectCont());
setActiveProject(getProjectCont()[getProjectCont().length - 1]);

