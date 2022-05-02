
const DisplayController = (function () {

    // DOM nodes
    const contentHeading = document.querySelector('.content-heading');
    const tasklist = document.querySelector('.tasklist');
    const sidebar = document.querySelector('.sidebar-container');
    const hamburgerMenuButton = document.querySelector('.hamburger-menu');
    
    // Events
    hamburgerMenuButton.addEventListener('click', toggleSidebar);

    function toggleSidebar () {
        if (sidebar.style.display !== 'flex') {
            sidebar.style.display = 'flex';
        } else {
            sidebar.style.display = 'none';
        }
    }

    const clearTaskList = () => {
        while (tasklist.lastChild) {
            tasklist.removeChild(tasklist.lastChild);
        }
    };

    const checkboxClicked = (item) => {
        item.complete = !item.complete;
        console.log(item.complete);
    }

    const populateProject = (project) => {
        clearTaskList();
        contentHeading.textContent = project.getTitle();

        for (let i = 0; i < project.getItems().length; i++) {
            const newContainer = document.createElement('div');
            newContainer.classList.add('item-container');

            // Colour mark
            const colourMark = document.createElement('div');
            colourMark.classList.add('colour-mark');
            switch (project.getItems()[i].priority) {
                case 'low':
                    colourMark.style.backgroundColor = 'yellow';
                    break;
                case 'medium':
                    colourMark.style.backgroundColor = 'orange';
                    break;
                case 'high':
                    colourMark.style.backgroundColor = 'red';
                    break;
                default:
                    colourMark.style.backgroundColor = 'yellow';
            }

            // Checkbox
            const itemCheckbox = document.createElement('input');
            itemCheckbox.classList.add('item-checkbox');
            itemCheckbox.classList.add('filled-in');
            itemCheckbox.type = 'checkbox';
            const newSpan = document.createElement('span');
            const newLabel = document.createElement('label');
            newLabel.classList.add('label-container');
            if (project.getItems()[i].complete) {
                itemCheckbox.checked = "checked";
            }
            itemCheckbox.addEventListener('click', () => {checkboxClicked(project.getItems()[i])} );

            // Title
            const itemTitle = document.createElement('div');
            itemTitle.classList.add('item-title');
            itemTitle.textContent = project.getItems()[i].title;

            // Duedate (date picker)
            const itemDueDate = document.createElement('input');
            itemDueDate.classList.add('item-duedate');
            itemDueDate.classList.add('datepicker');
            itemDueDate.type = "text";
            document.addEventListener('DOMContentLoaded', function() {
                var elems = document.querySelectorAll('.datepicker');
                let options = null;
                var instances = M.Datepicker.init(elems, options);
            });


            // Priority dropdown button
            const itemPriority = document.createElement('a');
            itemPriority.classList.add('item-priority');
            itemPriority.classList.add('dropdown-trigger');
            itemPriority.classList.add('btn');
            itemPriority.dataset.target = `dropdown${i}`;
            itemPriority.textContent = project.getItems()[i].priority;
            const dropdownStructure = document.createElement('ul');
            dropdownStructure.id = `dropdown${i}`;
            dropdownStructure.classList.add('dropdown-content');
            const low = document.createElement('li');
            const lowLink = document.createElement('a');
            lowLink.href = "#!";
            lowLink.textContent = "Low";
            low.appendChild(lowLink);
            dropdownStructure.appendChild(low);
            const medium = document.createElement('li');
            const mediumLink = document.createElement('a');
            mediumLink.href = "#!";
            mediumLink.textContent = "Medium";
            medium.appendChild(mediumLink);
            dropdownStructure.appendChild(medium);
            const high = document.createElement('li');
            const highLink = document.createElement('a');
            highLink.href = "#!";
            highLink.textContent = "High";
            high.appendChild(highLink);
            dropdownStructure.appendChild(high);
            document.addEventListener('DOMContentLoaded', function() {
                let elems = document.querySelectorAll('.dropdown-trigger');
                let options = document.querySelector(dropdownStructure.id);
                let instances = M.Dropdown.init(elems, options);
            });
            
            // Delete button
            const itemDelete = document.createElement('button');
            itemDelete.classList.add('item-delete');

            newContainer.appendChild(colourMark);
            newLabel.appendChild(itemCheckbox);
            newLabel.appendChild(newSpan);
            newContainer.appendChild(newLabel);
            newContainer.appendChild(itemTitle);
            newContainer.appendChild(itemDueDate);
            newContainer.appendChild(itemPriority);
            newContainer.appendChild(dropdownStructure);
            tasklist.appendChild(newContainer);

        }
    };

    

    return {toggleSidebar, populateProject};
})();

export {DisplayController};