// Task data is stored in the browser's Local Storage.
let tasks = [];

function getTasks() {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks === null) {
        tasks = [];
        return;
    }

    try {
        const parsedTasks = JSON.parse(savedTasks);
        tasks = Array.isArray(parsedTasks) ? parsedTasks : [];
    } catch (error) {
        console.error("Could not read saved tasks:", error);
        tasks = [];
    }
}

function storeTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function fillTasksOnPage() {
    const tasksContainer = document.getElementById("tasks");
    tasksContainer.replaceChildren();

    tasks.forEach((task, index) => {
        const taskElement = document.createElement("article");
        taskElement.className = `task${task.isdone ? " done" : ""}`;

        const taskInfo = document.createElement("div");
        taskInfo.className = "task-info";

        const title = document.createElement("h2");
        title.textContent = task.title;

        const dateContainer = document.createElement("div");
        dateContainer.className = "task-date";

        const calendarIcon = document.createElement("span");
        calendarIcon.className = "material-symbols-outlined";
        calendarIcon.setAttribute("aria-hidden", "true");
        calendarIcon.textContent = "calendar_month";

        const dateText = document.createElement("span");
        dateText.textContent = task.date;

        dateContainer.append(calendarIcon, dateText);
        taskInfo.append(title, dateContainer);

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const deleteButton = createActionButton(
            "delete",
            "Delete task",
            "delete-button",
            () => deleteTask(index)
        );

        const toggleButton = task.isdone
            ? createActionButton("cancel", "Mark as pending", "undo-button", () => completeTask(index))
            : createActionButton("done", "Mark as completed", "complete-button", () => completeTask(index));

        const editButton = createActionButton(
            "edit",
            "Edit task",
            "edit-button",
            () => editTask(index)
        );

        actions.append(deleteButton, toggleButton, editButton);
        taskElement.append(taskInfo, actions);
        tasksContainer.append(taskElement);
    });
}

function createActionButton(iconName, label, className, onClick) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `circ ${className}`;
    button.setAttribute("aria-label", label);
    button.addEventListener("click", onClick);

    const icon = document.createElement("span");
    icon.className = "material-symbols-outlined";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = iconName;

    button.append(icon);
    return button;
}

function addTask() {
    const taskName = prompt("Please, enter your task");

    if (taskName === null || taskName.trim() === "") {
        return;
    }

    const task = {
        title: taskName.trim(),
        date: new Date().toLocaleDateString("en-GB"),
        isdone: false
    };

    tasks.push(task);
    storeTasks();
    fillTasksOnPage();
}

function deleteTask(index) {
    const task = tasks[index];

    if (!task) {
        return;
    }

    const isConfirmed = confirm(`Are you sure you want to delete "${task.title}"?`);

    if (isConfirmed) {
        tasks.splice(index, 1);
        storeTasks();
        fillTasksOnPage();
    }
}

function editTask(index) {
    const task = tasks[index];

    if (!task) {
        return;
    }

    const newTitle = prompt("Enter the new task title", task.title);

    if (newTitle === null || newTitle.trim() === "") {
        return;
    }

    task.title = newTitle.trim();
    storeTasks();
    fillTasksOnPage();
}

function completeTask(index) {
    const task = tasks[index];

    if (!task) {
        return;
    }

    task.isdone = !task.isdone;
    storeTasks();
    fillTasksOnPage();
}

// Initialize the application.
getTasks();
fillTasksOnPage();

document.getElementById("btn-add").addEventListener("click", addTask);
