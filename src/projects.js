let projects = [];

class CreateProject {
  constructor(name) {
    this.name = name;
  }
  todoList = [];
}

const addProjectToArray = (name) => {
  projects.push(new CreateProject(name));
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
};

const removeTodo = function(todoName, projectIndex){
  const todoIndex = projects[projectIndex].todoList.map((e) => e.name).indexOf(todoName);
  projects[projectIndex].todoList.splice(todoIndex, 1);
}

const removeProject = (projectName) => {
  const projectIndex = projects.map((e) => e.name).indexOf(projectName);
  projects.splice(projectIndex, 1);
}

const returnImportant = () => {
  const important = [];
  for(let project of projects){
    let projectImportant = project.todoList.filter((el) => el.important === true);
    important.push(...projectImportant);
  }
  return important;
}

addProjectToArray("Default");

export { addProjectToArray, 
   addTodoToArray,
   projects, 
   removeTodo, 
   removeProject, 
   returnImportant,
  };
