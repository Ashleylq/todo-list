let projects = [];
 
class CreateProject {
    constructor(name){
        this.name = name;
    }
    todoList = [];
    #addTodo = function(title, priority, description, dueDate){
        return {title, priority, description, dueDate};
    }
    addTodoToArray = function(title, priority, description, dueDate){
        this.todoList.push(this.#addTodo(title, priority, description, dueDate));
    }
}

const addProjectToArray = (name) => {
   projects.push(new CreateProject(name));
}