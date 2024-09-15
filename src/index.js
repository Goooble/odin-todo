import "./reset.css";
import "./styles.css";

import { createTodo, deleteTodo, todoCont } from "./manTodo";

createTodo("title");
console.log(todoCont[0])
deleteTodo(todoCont[0]);
console.log(todoCont[0])
