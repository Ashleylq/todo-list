import "./styles.css";
import * as domModule from "./dom";

domModule.renderProjects();

document.querySelector(".new-project").addEventListener("click", () => { domModule.openProjectDialog() });

document.querySelector(".project-dialog > form").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const newName = formData.get("name");
  domModule.submitProjectDialog(newName);
});

document.querySelector(".new-todo").addEventListener("click", () => { domModule.openTodoDialog() });

document.querySelector(".todo-dialog > form").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  domModule.submitTodoDialog(formData);
});

document.querySelector(".all").addEventListener("click", () => {domModule.renderProjects()})

document.querySelector(".important").addEventListener("click", () => {domModule.renderImportant()})

document.querySelector('.today').addEventListener("click", () => {domModule.renderToday()})

document.querySelector('.week').addEventListener("click", () => {domModule.renderThisWeek()})

document.querySelector('.month').addEventListener("click", () => {domModule.renderThisMonth()})