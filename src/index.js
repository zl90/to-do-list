import './style.css';
import { DisplayController } from './DisplayController';
import { ObjectController, Project, ToDoItem } from './ObjectController';


const MainController = (function () {
    DisplayController.populateProject(ObjectController.getProjectByTitle("Default"));

    // const newItem = ToDoItem('TestItem');
    // newItem.complete = true;
    // ObjectController.getProjectByTitle("Default").addItem(newItem);
    // ObjectController.saveToLocalStorage();
})();

/* 

|| `'-,_,.-'`^'-.,_,.-'` TODO LIST `'-,_,.-'`^'-.,_,.-'` ||

[X] Checkbox functionality --> ToDoItem.complete (fixed by passing ToDoItem ref to the event listener. Easy!)
[ ] Gray-out ToDoItems when they are complete
[ ] Date Picker functionality --> ToDoItem.duedate
[ ] Resize the date picker (look up Materialize docs)
[ ] Set a placeholder value for the datepicker: "Date due..."
[ ] Priority Picker functionality --> ToDoItem.priority
[ ] Connect the Priority Picker to the Colour Mark
[ ] Add a {+} button underneath the list items
[ ] Navbar functionality
    [ ] Display all projects as buttons
    [ ] Link project buttons to the "populateProject" function

*/