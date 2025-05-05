import * as projectModule from "./projects";

const deleteAllChildren = (element) => {
  while(element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

/* render */

const container = document.querySelector('.container');

const expandTodo = (todo) => {
  const card = document.createElement('div');
  card.setAttribute('class','expand-card');
  const close = document.createElement('span');
  close.setAttribute('class', 'material-icons close');
  close.textContent = 'close';
  close.addEventListener('click', () => {
    deleteAllChildren(card);
    card.remove();
  })
  const bookmarkButton = document.createElement('span');
  bookmarkButton.setAttribute('class', 'material-icons bookmark');
  bookmarkButton.textContent = "bookmark";
  if (todo["important"] === true){
    bookmarkButton.style.color = "yellow";
  }
  else {
    bookmarkButton.style.color = "black";
  }
  bookmarkButton.addEventListener('click', () => {
    if (todo["important"] === true){
      todo["important"] = false;
      bookmarkButton.style.color = "black";
    }
    else {
      todo["important"] = true;
      bookmarkButton.style.color = "yellow";
    }
  })
  const name = document.createElement('p');
  name.textContent = todo["title"];
  const project = document.createElement('p');
  project.textContent = todo["projectName"];
  const note = document.createElement('p');
  note.textContent = todo["notes"];
  const date = document.createElement('p');
  date.textContent = todo["dueDate"];
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    const projectIndex = projectModule.projects.map((e) => e.name).indexOf(todo["projectName"]);
    projectModule.removeTodo(todo["title"], projectIndex);
    renderTodos(projectModule.projects[projectIndex].todoList);
  })
  deleteButton.setAttribute('class', 'delete-button');
  container.appendChild(card);
  card.appendChild(close);
  card.appendChild(bookmarkButton);
  card.appendChild(name);
  card.appendChild(project);
  card.appendChild(note);
  card.appendChild(date);
  card.appendChild(deleteButton);
}

const renderTodos = (list) => {
  container.classList.replace("project-container", "todo-container");
  deleteAllChildren(container);
  for (let todo of list) {
    const todoCard = document.createElement("div");
    todoCard.setAttribute("class", "todo-card");
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    const title = document.createElement("span");
    title.textContent = todo["title"];
    const date = document.createElement("span");
    const dueDate = todo["dueDate"].toLocaleDateString();
    date.textContent = dueDate;
    container.appendChild(todoCard);
    todoCard.addEventListener('click', () => {
      expandTodo(todo)
    });
    switch (todo["priority"]) {
      case "1":
        todoCard.style.borderLeft = "3px solid green";
        break;
      case "2":
        todoCard.style.borderLeft = "3px solid blue";
        break;
      case "3":
        todoCard.style.borderLeft = "3px solid yellow";
        break;
      case "4":
        todoCard.style.borderLeft = "3px solid orange";
        break;
      case "5":
        todoCard.style.borderLeft = "3px solid red";
    }
    todoCard.appendChild(checkbox);
    todoCard.appendChild(title);
    todoCard.appendChild(date);
  }
};

const renderProjects = () => {
  container.classList.add("project-container");
  deleteAllChildren(container);
  for (let project of projectModule.projects) {
    const card = document.createElement("div");
    card.textContent = project["name"];
    card.addEventListener("click", () => {
      renderTodos(project["todoList"]);
    });
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener('click', () => {projectModule.removeProject(project["name"])} )
    deleteButton.setAttribute('class', 'delete-button');
    container.appendChild(card);
    card.appendChild(deleteButton);
  }
};

/* Project dialog */

const projectDialog = document.querySelector(".project-dialog");

const openProjectDialog = () => {
  document.querySelector('.project-dialog .close').addEventListener('click', () => {projectDialog.close()})
  projectDialog.showModal();
};

const submitProjectDialog = (name) => {
  projectModule.addProjectToArray(name);
  renderProjects();
  projectDialog.close();
};

/*todo dialog*/

const todoDialog = document.querySelector(".todo-dialog");

const openTodoDialog = () => {
  todoDialog.showModal();
  document.querySelector('.todo-dialog .close').addEventListener('click', () => {todoDialog.close()});
  const selectProject = document.querySelector("select");
  for (let project of projectModule.projects) {
    const option = document.createElement("option");
    option.setAttribute("value", project["name"]);
    option.textContent = project["name"];
    selectProject.add(option);
  }
};

const submitTodoDialog = (formdata) => {
  const newTitle = formdata.get("title");
  const newDate = new Date(formdata.get("date"));
  newDate.setHours(0, 0, 0, 0);
  const notes = formdata.get("notes");
  const priority = formdata.get("priority");
  const project = formdata.get("project");
  const projectIndex = projectModule.projects.map((e) => e.name).indexOf(project);
  projectModule.addTodoToArray(projectIndex, newTitle, notes, priority, newDate);
  todoDialog.close();
  renderTodos(projectModule.projects[projectIndex].todoList);
};

/*filter and render*/

const renderImportant = () => {
  const important = projectModule.returnImportant();
  renderTodos(important);
}

const renderToday = () => {
  const today = projectModule.findToday();
  renderTodos(today)
}

const renderThisWeek = () => {
  const thisWeek = projectModule.findThisWeek();
  renderTodos(thisWeek);
}

const renderThisMonth = () => {
  const thisMonth = projectModule.findThisMonth();
  renderTodos(thisMonth);
}

export {
  deleteAllChildren,
  openProjectDialog,
  submitProjectDialog,
  renderProjects,
  openTodoDialog,
  submitTodoDialog,
  renderImportant,
  renderToday,
  renderThisWeek,
  renderThisMonth,
};
