import { isToday, isThisWeek, isThisMonth } from "date-fns";

let projects = [];

const localStorageGet = function() {
  if (localStorage.getItem("projectArray")){
    const json = localStorage.getItem("projectArray");
    let localProjects = JSON.parse(json);
    for(let project of localProjects){
      for(let todo of project.todoList){
        todo.dueDate = new Date(todo.dueDate);
        todo.dueDate.setHours(0, 0, 0, 0);
      }
     }
    projects = localProjects;
  }
  else {
    addProjectToArray('default');
  }
}

class CreateProject {
  constructor(name) {
    this.name = name;
  }
  todoList = [];
}

function addProjectToArray(name){
  projects.push(new CreateProject(name));
  localStorage.setItem("projectArray", JSON.stringify(projects));
};

const createTodo = function (projectName, title, notes, priority, dueDate, important) {
  return { projectName, title, notes, priority, dueDate, important };
};

const addTodoToArray = function (
  projectIndex,
  title,
  notes,
  priority,
  dueDate,
) {
  projects[projectIndex].todoList.push(
    createTodo(projects[projectIndex]["name"], title, notes, priority, dueDate, false),
  );
  localStorage.setItem("projectArray", JSON.stringify(projects));
};

const removeTodo = function(todoName, projectIndex){
  const todoIndex = projects[projectIndex].todoList.map((e) => e.name).indexOf(todoName);
  projects[projectIndex].todoList.splice(todoIndex, 1);
  localStorage.setItem("projectArray", JSON.stringify(projects));
}

const removeProject = (projectName) => {
  const projectIndex = projects.map((e) => e.name).indexOf(projectName);
  projects.splice(projectIndex, 1);
  localStorage.setItem("projectArray", JSON.stringify(projects));
}

const returnImportant = () => {
  let important = [];
  for(let project of projects){
    let projectImportant = project.todoList.filter((el) => el.important === true);
    important.push(...projectImportant);
  }
  return important;
}

const findToday = () => {
  let today = [];
  for (let project of projects){
    let projectToday = project.todoList.filter((el) => isToday(el.dueDate));
    today.push(...projectToday);
  }
  return today;
}

const findThisWeek = () => {
  let thisWeek = [];
  for (let project of projects){
    let projectThisWeek = project.todoList.filter((el) => isThisWeek(el.dueDate));
    thisWeek.push(...projectThisWeek)
  }
  return thisWeek;
}

const findThisMonth = () => {
  let thisMonth = [];
  for (let project of projects){
    let projectThisMonth = project.todoList.filter((el) => isThisMonth(el.dueDate));
    thisMonth.push(...projectThisMonth);
  }
  return thisMonth;
}

localStorageGet();

export { addProjectToArray, 
   addTodoToArray,
   projects, 
   removeTodo, 
   removeProject, 
   returnImportant,
   findToday,
   findThisWeek,
   findThisMonth,
   localStorageGet
  };
