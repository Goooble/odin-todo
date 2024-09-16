import "./reset.css";
import "./styles.css";
//interface between dom and scripts
import {
  cleanInputBox,
  displayTodoList,
  displayProjectList,
  addProjectHandler,
} from "./DOM";
import { addProject, getProjectCont } from "./projectHandler";

//default

//event listeners
//quick add todos
const inputBox = document.querySelector("header input");
inputBox.addEventListener("keydown", quickAdd);

function quickAdd(e) {
  if (e.key === "Enter" && inputBox.value !== "") {
    getProjectCont()[0].addTodo(inputBox.value); //project reworkd
    cleanInputBox(inputBox);
    displayTodoList.displayTodo(getProjectCont()[0].getTodoCont());
  }
}

//add projects
const addProjectBut = document.querySelector(".add-project-but");
const addProjectInput = document.querySelector("aside input");

addProjectBut.addEventListener("click", () => {
  addProjectHandler.toggleInput();
  addProjectInput.focus();
});


addProjectInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && addProjectInput.value !== "") {
    addProjectHandler.toggleInput();
    addProject(addProjectInput.value);
    displayProjectList.displayProject(getProjectCont());
    cleanInputBox(addProjectInput);
  }
});


addProject("inbox");
displayProjectList.displayProject(getProjectCont());