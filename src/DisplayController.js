import { MainController } from ".";
import { ObjectController, Project, ToDoItem } from './ObjectController';
import endOfToday from 'date-fns/endOfToday';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import isTomorrow from 'date-fns/isTomorrow';

const DisplayController = (function () {

    // DOM nodes
    let contentHeading = document.querySelector('.content-heading');
    const tasklist = document.querySelector('.tasklist');
    const sidebar = document.querySelector('.sidebar-container');
    const hamburgerMenuButton = document.querySelector('.hamburger-menu');
    let addTaskButton = document.querySelector('.addtask');
    const sidebarDefaultContainer = document.querySelector('.sidebar-default-container');
    const sidebarProjectsContainer = document.querySelector('.sidebar-projects-container');
    let addProjectButton = document.querySelector('.addproject');
    
    // Events
    hamburgerMenuButton.addEventListener('click', toggleSidebar);
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize Materialize dropdown tool
        let elems = document.querySelectorAll('.dropdown-trigger');
        let options = document.querySelectorAll('.dropdown-trigger');
        let instances = M.Dropdown.init(elems, options);
    });
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize Materialize date-picker tool
        var elems = document.querySelectorAll('.datepicker');
        let options = null;
        var instances = M.Datepicker.init(elems, options);
    });

    // Methods
    function toggleSidebar () {
        if (sidebar.style.display !== 'flex') {
            sidebar.style.display = 'flex';
        } else {
            sidebar.style.display = 'none';
        }
    }

    function clearEventListeners(el, withChildren) {
        if (withChildren) {
          el.parentNode.replaceChild(el.cloneNode(true), el);
        }
        else {
          var newEl = el.cloneNode(false);
          while (el.hasChildNodes()) newEl.appendChild(el.firstChild);
          el.parentNode.replaceChild(newEl, el);
        }
      }

    const clearTaskList = () => {
        while (tasklist.lastChild) {
            tasklist.removeChild(tasklist.lastChild);
        }
    };

    const clearProjectList = () => {
        while (sidebarProjectsContainer.lastChild) {
            sidebarProjectsContainer.removeChild(sidebarProjectsContainer.lastChild);
        }
    };

    const save = (project) => {
        MainController.saveToLocalStorage();
        populateProject(project);
    };

    const saveSidebar = (projects) => {
        MainController.saveToLocalStorage();
        MainController.populateSidebar();
    };

    const clickCheckbox = (item, container, project) => {
        item.complete = !item.complete;
        save(project);
    }

    const clickPriority = (item, newPriority, colourMark, button, project) => {
        item.priority = newPriority;
        save(project);
    };

    const clickDelete = (container, project, itemIndex) => {
        container.parentNode.removeChild(container);
        project.removeItem(itemIndex);
        save(project);
    };

    const clickAddTask = (project) => {
        // Temporary function to add a default object
        const newItem = ToDoItem(``);
        project.addItem(newItem);
        save(project);
    };

    const changeDueDate = (project, item, datepicker) => {
        if (datepicker.value) {
            item.dueDate = format(new Date(datepicker.value), 'MM/dd/yyyy');
        } else {
            item.dueDate = format(endOfToday(), 'MM/dd/yyyy');
        }
        
        save(project);
    };

    const changeTitle = (project, item, newTitle) => {
        item.title = newTitle;
        save(project);
    };

    const deleteProject = (projects, i) => {
        MainController.removeProject(i);
        saveSidebar(projects);
    };

    const namingCollisionFound = (projects, name) => {
        let matchFound = false;
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].getTitle() === name) {
                matchFound = true;
            }
        }

        return matchFound;
    };

    const clickAddProject = (projects) => {
        let newTitle = 'New project';
        let iterator = 0;
        while (namingCollisionFound(projects, newTitle)) {
            newTitle = `New project${iterator}`;
            iterator++;
        }
        const newProject = Project(newTitle);
        MainController.addProject(newProject);
        saveSidebar(projects);
    };

    const changeProjectTitle = (project, inputField) => {
        project.setTitle(inputField.value);
        save(project);
        saveSidebar();
    };

    const populateSidebar = (projects) => {
        clearProjectList();
        clearEventListeners(addProjectButton, false);
        addProjectButton = document.querySelector('.addproject');
        addProjectButton.addEventListener('click', () => {clickAddProject(projects);});

        for (let i = 0; i < projects.length; i++) {
            const newContainer = document.createElement('button');
            newContainer.classList.add('project-container');

            // Icon
            const newIcon = document.createElement('i');
            newIcon.classList.add('material-icons');
            newIcon.classList.add('center');
            newIcon.textContent = "format_list_bulleted";

            // Title
            const newTitle = document.createElement('div');
            newTitle.classList.add('project-title-div');
            newTitle.classList.add('truncate');
            newTitle.textContent = projects[i].getTitle();

            

            // Delete button
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('project-delete-button');
            const deleteIcon = document.createElement('i');
            deleteIcon.classList.add('material-icons');
            deleteIcon.classList.add('center');
            deleteIcon.textContent = "clear";
            deleteButton.appendChild(deleteIcon);
            deleteButton.addEventListener('click', () => {deleteProject(projects, i)});

            // Append item to the sidebar
            newContainer.appendChild(newIcon);
            newContainer.appendChild(newTitle);
            newContainer.appendChild(deleteButton);
            sidebarProjectsContainer.appendChild(newContainer);

            // Make sure the Default project is on the top
            if (projects[i].getTitle() === "Default") {
                newContainer.style.order = 0;
            } else {
                newContainer.style.order = 1;
            }

            // Event listener to populate the project
            newContainer.addEventListener('click', () => {populateProject(projects[i])});
        }
    };

    const populateProject = (project) => {
        
        clearTaskList();
        contentHeading.value = project.getTitle();
        clearEventListeners(addTaskButton, false);
        clearEventListeners(contentHeading, false);
        
        contentHeading = document.querySelector('.content-heading');
        contentHeading.addEventListener('change', () => {changeProjectTitle(project, contentHeading);});
        addTaskButton = document.querySelector('.addtask');
        addTaskButton.addEventListener('click', () => {clickAddTask(project);});
        
        for (let i = 0; i < project.getItems().length; i++) {
            const newContainer = document.createElement('div');
            newContainer.classList.add('item-container');

            // Colour mark
            const colourMark = document.createElement('div');
            colourMark.classList.add('colour-mark');
            if (!project.getItems()[i].complete) {
                switch (project.getItems()[i].priority) {
                    case 'low':
                        colourMark.style.backgroundColor = 'yellow';
                        newContainer.style.order = 2;
                        break;
                    case 'medium':
                        colourMark.style.backgroundColor = 'orange';
                        newContainer.style.order = 1;
                        break;
                    case 'high':
                        colourMark.style.backgroundColor = 'red';
                        newContainer.style.order = 0;
                        break;
                    default:
                        colourMark.style.backgroundColor = 'yellow';
                }
            } else {
                colourMark.style.backgroundColor = "rgb(180, 180, 180)";
            }

            // Checkbox
            const itemCheckbox = document.createElement('input');
            itemCheckbox.classList.add('item-checkbox');
            itemCheckbox.classList.add('filled-in');
            itemCheckbox.type = 'checkbox';
            const newSpan = document.createElement('span');
            const newLabel = document.createElement('label');
            newLabel.classList.add('valign-wrapper');
            newLabel.classList.add('center');
            newLabel.classList.add('label-container');
            if (project.getItems()[i].complete) {
                itemCheckbox.checked = "checked";
                newContainer.classList.add("item-complete");
            }
            itemCheckbox.addEventListener('click', () => {clickCheckbox(project.getItems()[i], newContainer, project)} );

            // Title
            const itemTitle = document.createElement('div');
            itemTitle.classList.add('input-field');
            itemTitle.classList.add('item-title');
            const newInputField = document.createElement('input');
            newInputField.classList.add('validate');
            newInputField.classList.add('title-input');
            newInputField.value = project.getItems()[i].title;
            
            newInputField.placeholder = "Click to change title...";
            newInputField.addEventListener('change', () => {changeTitle(project, project.getItems()[i], newInputField.value)});
            itemTitle.appendChild(newInputField);

            // Duedate (date picker)
            const itemDueDate = document.createElement('input');
            itemDueDate.classList.add('item-duedate');
            itemDueDate.classList.add('datepicker');
            itemDueDate.classList.add('valign-wrapper');
            itemDueDate.value = format(new Date(project.getItems()[i].dueDate), 'MM/dd/yyyy');
            if (isToday(new Date(itemDueDate.value))) {
                itemDueDate.value = "Today";
            } else if (isTomorrow(new Date(itemDueDate.value))) {
                itemDueDate.value = "Tomorrow";
            }
            itemDueDate.type = "text";
            
            itemDueDate.addEventListener('change', () => {changeDueDate(project, project.getItems()[i], itemDueDate)});
        
            // Priority dropdown button
            const itemPriority = document.createElement('a');
            itemPriority.classList.add('item-priority');
            itemPriority.classList.add('dropdown-trigger');
            itemPriority.classList.add('btn-small');
            
            itemPriority.dataset.target = `dropdown${i}`;
            itemPriority.textContent = project.getItems()[i].priority;
            const dropdownStructure = document.createElement('ul');
            dropdownStructure.id = `dropdown${i}`;
            dropdownStructure.classList.add('dropdown-content');
            const low = document.createElement('li');
            const lowLink = document.createElement('a');
            lowLink.href = "#!";
            lowLink.style.color = "gray";
            lowLink.textContent = "Low";
            lowLink.addEventListener('click', () => {clickPriority(project.getItems()[i], "low", colourMark, itemPriority, project);});
            low.appendChild(lowLink);
            dropdownStructure.appendChild(low);
            const medium = document.createElement('li');
            const mediumLink = document.createElement('a');
            mediumLink.href = "#!";
            mediumLink.style.color = "gray";
            mediumLink.textContent = "Medium";
            mediumLink.addEventListener('click', () => {clickPriority(project.getItems()[i], "medium", colourMark, itemPriority, project);});
            medium.appendChild(mediumLink);
            dropdownStructure.appendChild(medium);
            const high = document.createElement('li');
            const highLink = document.createElement('a');
            highLink.href = "#!";
            highLink.style.color = "gray";
            highLink.textContent = "High";
            highLink.addEventListener('click', () => {clickPriority(project.getItems()[i], "high", colourMark, itemPriority, project);});
            high.appendChild(highLink);
            dropdownStructure.appendChild(high);
            
            // Delete button
            const itemDelete = document.createElement('a');
            itemDelete.classList.add('item-delete');
            itemDelete.classList.add('btn-raised');
            itemDelete.classList.add('btn-small');
            itemDelete.classList.add('waves-effect');
            itemDelete.classList.add('waves-light');
            itemDelete.classList.add('red');
            itemDelete.addEventListener('click', () => {clickDelete(newContainer, project, i);})
            const deleteIcon = document.createElement('i');
            deleteIcon.classList.add('material-icons');
            deleteIcon.textContent = 'close';
            itemDelete.appendChild(deleteIcon);

            // Gray out items if they are complete
            if (project.getItems()[i].complete) {
                const colourWhenComplete = "gray";
                const textDecorationWhenComplete = "line-through";
                itemPriority.style.textDecoration = textDecorationWhenComplete;
                itemPriority.style.color = colourWhenComplete;
                itemDueDate.style.textDecoration = textDecorationWhenComplete;
                itemDueDate.style.color = colourWhenComplete;
                newInputField.style.textDecoration = textDecorationWhenComplete;
                newInputField.style.color = colourWhenComplete;
                // Put completed items at the bottom of the list
                newContainer.style.order = project.getItems().length;
            }

            // Append to the DOM
            newContainer.appendChild(colourMark);
            newLabel.appendChild(itemCheckbox);
            newLabel.appendChild(newSpan);
            newContainer.appendChild(newLabel);
            newContainer.appendChild(itemTitle);
            newContainer.appendChild(itemDueDate);
            newContainer.appendChild(itemPriority);
            newContainer.appendChild(dropdownStructure);
            newContainer.appendChild(itemDelete);
            tasklist.appendChild(newContainer);

            // Re-initialise Materialize components
            M.AutoInit();
        }
    };

    return {toggleSidebar, populateProject, populateSidebar};
})();

export {DisplayController};