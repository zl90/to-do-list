
import endOfToday from 'date-fns/endOfToday';

const ToDoItem = (title = 'Title...', dueDate = endOfToday(), priority = 'low') => {
    let complete = false;

    const setComplete = (setting) => {complete = setting;};
    const getComplete = () => {return complete;};
    const getTitle = () => {return title};
    const setTitle = (newTitle) => {title = newTitle;};
    const getDueDate = () => {return dueDate;};
    const setDueDate = (newDate) => {dueDate = newDate;};
    const getPriority = () => {return priority;};
    const setPriority = (newPriority) => {priority = newPriority;};

    return {setComplete, getComplete, getTitle, setTitle, getDueDate, setDueDate, getPriority, setPriority};
};

const Project = (title = 'Project title...') => {
    const items = [];

    const addItem = (newItem) => {items.push(newItem);};
    const getItems = () => {return items;};
    const removeItem = (index) => {items.splice(index, 1)};
    const getTitle = () => {return title;};
    const setTitle = (newTitle) => {title = newTitle};

    return {addItem, getItems, removeItem, getTitle, setTitle};
};

const todo = ToDoItem('yeet the gamers');
console.table(todo.getTitle());

const ObjectController = (function () {

    const defaultProject = Project('Default');
    const projects = [defaultProject];

    const getProjects = () => {return projects;};

    return {getProjects};
})();

export {ObjectController};