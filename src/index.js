import './style.css';
import { DisplayController } from './DisplayController';
import { ObjectController, Project, ToDoItem } from './ObjectController';


const MainController = (function () {
    DisplayController.populateProject(ObjectController.getProjectByTitle("Default"));

    // const newItem = ToDoItem('TestItem');
    // newItem.complete = true;
    // ObjectController.getProjectByTitle("Default").addItem(newItem);
    // ObjectController.saveToLocalStorage();

    const saveToLocalStorage = () => {
        ObjectController.saveToLocalStorage();
    };

    return {saveToLocalStorage};
})();

export {MainController};

/* 

|| `'-,_,.-'`^'-.,_,.-'` TODO LIST `'-,_,.-'`^'-.,_,.-'` ||

[X] Checkbox functionality --> ToDoItem.complete (fixed by passing ToDoItem ref to the event listener. Easy!)
[ ] Gray-out ToDoItems when they are complete
[ ] Date Picker functionality --> ToDoItem.duedate
[ ] Resize the date picker (look up Materialize docs)
[ ] Set a placeholder value for the datepicker: "Date due..."
[X] Delete button
[X] Delete button functionality
[X] Fix Delete button styling (look up Materialize docs)
[X] Priority Picker functionality --> ToDoItem.priority
[X] Connect the Priority Picker to the Colour Mark
[X] Add a {+} button underneath the list items
[ ] Fix the sizing issues inside the Item Container
[X] Temporary {+} button
[ ] {+} Button functionality
[ ] Navbar functionality
    [ ] Display all projects as buttons
    [ ] Link project buttons to the "populateProject" function

*/