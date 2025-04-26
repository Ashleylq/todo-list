let projects = [];
 
const createProject = function(name){
    const name = name;
    const todoList = [];
    const addTodo = function(title, priority, description, dueDate){
        const title = title;
        const priority = priority;
        const description = description;
        const dueDate = dueDate;
        return {title, priority, description, dueDate};
    }
    const addTodoToArray = function(title, priority, description, dueDate){
        todoList.push(addTodo(title, priority, description, dueDate));
    }
    return {name, todoList, addTodoToArray}
}

const addProjectToArray = function(name){
   projects.push(createProject(name));
}