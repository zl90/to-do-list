import './style.css';
import { DisplayController } from './DisplayController';
import { ObjectController, Project, ToDoItem } from './ObjectController';



ObjectController.loadFromLocalStorage();
console.log(ObjectController.getProjects());