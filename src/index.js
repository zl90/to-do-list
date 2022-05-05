import './style.css';
import { DisplayController } from './DisplayController';
import { ObjectController, Project, ToDoItem } from './ObjectController';


const MainController = (function () {

    const populateSidebar = () => {
        DisplayController.populateSidebar(ObjectController.getProjects());
    };

    const saveToLocalStorage = () => {
        ObjectController.saveToLocalStorage();
    };

    const addProject = (project) => {
        ObjectController.addProject(project);
    };

    const removeProject = (index) => {
        ObjectController.removeProject(index);
    };

    populateSidebar();
    DisplayController.populateProject(ObjectController.getProjectByTitle("Default"));

    return {saveToLocalStorage, addProject, removeProject, populateSidebar};
})();

export {MainController};

/* 

||`'-,_,.-''`^'-.,_,,.-'`|_TODO_LIST_|`'-,_,,.-''`^'-.,_,.-'`||

[X] Checkbox functionality --> ToDoItem.complete (fixed by passing ToDoItem ref to the event listener. Easy!)
[X] Gray-out ToDoItems when they are complete
[X] Date Picker functionality --> ToDoItem.duedate
[X] Resize the date picker (look up Materialize docs)
[X] Resize the buttons
[X] Set a placeholder value for the datepicker: "Date due..."
[X] Add the ability to click the Title and edit it
[X] Delete button
[X] Delete button functionality
[X] Fix Delete button styling (look up Materialize docs)
[X] Priority Picker functionality --> ToDoItem.priority
[X] Connect the Priority Picker to the Colour Mark
[X] Add a {+} button underneath the list items
[X] Fix the sizing issues inside the Item Container
[X] Temporary {+} button
[X] {+} Button functionality
[~] Navbar functionality
    [X] Display all projects as buttons
    [X] Link project buttons to the "populateProject" function
    [X] Order buttons properly (default at the top)
    [X] Make it possible to rename projects
[ ] Add the logo
[ ] Add a favicon

*/