import "./reset.css";
import "./assets/webfontkit-20240914-041733/stylesheet.css"
import "./styles.css";
import { createHome } from "./home";
import { createElixir } from "./elixir";
import { createContact } from "./contact";
createHome();

const homeBut = document.querySelector(".homeBut");
const elixirBut = document.querySelector(".elixirBut");
const contactBut = document.querySelector(".contactBut");


homeBut.addEventListener("click", () => {
    console.log("jome")
    erase();
    createHome();
})

elixirBut.addEventListener("click", () => {
    console.log("elixir")
    erase();
    createElixir();
})

contactBut.addEventListener("click", () => {
    console.log("contanct")
    erase();
    createContact();
})

function erase(){
    const contentChild = document.querySelector("#content>div");
    console.log("erase")
    contentChild.remove();
}
