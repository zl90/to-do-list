
import endOfToday from 'date-fns/endOfToday';

const ToDoItem = (title = 'Title...', dueDate = endOfToday(), priority = 'low') => {
    let complete = false;

    return {title, dueDate, priority, complete};
};

const Project = (title = 'Project title...') => {
    const items = [];

    const addItem = (newItem) => {items.push(newItem);};
    const getItems = () => {return items;};
    const removeItem = (index) => {items.splice(index, 1)};
    const getTitle = () => {return title;};
    const setTitle = (newTitle) => {title = newTitle};
    const stringify = () => {return JSON.stringify(items);};

    return {addItem, getItems, removeItem, getTitle, setTitle, stringify};
};

const ObjectController = (function () {

    const projects = [];
    
    const getProjects = () => {return projects;};

    const addProject = (newProject) => {projects.push(newProject);};

    const saveToLocalStorage = () => {
        localStorage.clear();
        for (let i = 0; i < projects.length; i++) {
            localStorage.setItem([projects[i].getTitle()], projects[i].stringify());
            console.log(projects[i].stringify());
        }
    };

    const loadFromLocalStorage = () => {
        if (localStorage.length === 0) {
            const newProject = Project("Default");
            addProject(newProject);
            saveToLocalStorage();
        } else {
            for (let i = 0; i < localStorage.length; i++) {
                const newProject = Project(localStorage.key(i));
                let retrievedData = localStorage.getItem(localStorage.key(i));
                let parsedData = JSON.parse(retrievedData);
                // Add ToDoItems to project
                for (let j = 0; j < parsedData.length; j++) {
                    
                    newProject.addItem(parsedData[j]);
                }
    
                addProject(newProject);
            }
        }
    };

    const stringify = () => {return JSON.stringify(projects)};

    return {getProjects, saveToLocalStorage, stringify, addProject, loadFromLocalStorage};
})();

export {ObjectController, Project, ToDoItem};