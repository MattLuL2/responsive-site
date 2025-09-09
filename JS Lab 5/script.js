let taskIdCounter = 0;
let draggedTask = null;

function addTask() {
    const taskInput = document.getElementById("task");
    const taskValue = taskInput.value.trim();

    if (taskValue === "") {
        alert("Please enter a task.");
        return;
    }

    const newTask = document.createElement("div");
    newTask.classList.add("task-item");
    newTask.textContent = taskValue;

    newTask.id = `task-${taskIdCounter++}`;

    newTask.setAttribute("draggable", "true");
    newTask.addEventListener("dragstart", handleDragStart);

    newTask.addEventListener("touchstart", handleTouchStart);
    newTask.addEventListener("touchmove", handleTouchMove);
    newTask.addEventListener("touchend", handleTouchEnd);

    const todoColumn = document.getElementById("todo");
    todoColumn.appendChild(newTask);

    taskInput.value = "";
}

function handleDragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
    event.target.classList.add("dragging");
}

function handleDragOver(event) {
    event.preventDefault();
}

function handleDrop(event) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text/plain");
    const task = document.getElementById(taskId);

    if (event.target.classList.contains("task-column")) {
        event.target.appendChild(task);
    } else if (event.target.parentElement.classList.contains("task-column")) {
        event.target.parentElement.appendChild(task);
    }

    task.classList.remove("dragging");
}

function handleTouchStart(event) {
    draggedTask = event.target;
    draggedTask.classList.add("dragging");
}

function handleTouchMove(event) {
    event.preventDefault(); 
    const touch = event.touches[0];
    draggedTask.style.position = "absolute";
    draggedTask.style.left = `${touch.clientX - draggedTask.offsetWidth / 2}px`;
    draggedTask.style.top = `${touch.clientY - draggedTask.offsetHeight / 2}px`;
}

function handleTouchEnd(event) {
    draggedTask.classList.remove("dragging");
    draggedTask.style.position = "static";

    const touch = event.changedTouches[0];
    const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);

    if (dropTarget && dropTarget.classList.contains("task-column")) {
        dropTarget.appendChild(draggedTask);
    } else if (dropTarget && dropTarget.parentElement.classList.contains("task-column")) {
        dropTarget.parentElement.appendChild(draggedTask);
    }

    draggedTask = null;
}

document.querySelectorAll(".task-column").forEach(column => {
    column.addEventListener("dragover", handleDragOver);
    column.addEventListener("drop", handleDrop);
});