console.log("Todo App loaded successfully!");
const taskSummary = document.getElementById("taskSummary");

let tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

console.log(tasks);
console.log(tasks[0]?.text);
console.log(tasks[1]?.completed);

const taskList = document.getElementById("taskList");

function displayTasks() {
    taskList.innerHTML = "";

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(function (task) {
        return task.completed === true;
    }).length;

    const remainingTasks = totalTasks - completedTasks;

    if (totalTasks === 0) {
        taskSummary.textContent = "You have no tasks yet.";
    } else {
        taskSummary.textContent =
            `${totalTasks} total tasks · ${completedTasks} completed · ${remainingTasks} remaining`;
    }

    if (totalTasks === 0) {
        const emptyMessage = document.createElement("li");

        emptyMessage.textContent = "No tasks yet. Add your first task!";
        emptyMessage.classList.add("empty-message");

        taskList.appendChild(emptyMessage);
    }


    tasks.forEach(function (task) {
        const li = document.createElement("li");

        const taskText = document.createElement("span");
        taskText.textContent = task.text;
        
        taskText.setAttribute("role", "button");
        taskText.setAttribute("tabindex", "0");
        taskText.setAttribute(
            "aria-label",
            `Mark ${task.text} as ${task.completed ? "incomplete" : "complete"}`
        );

        if (task.completed === true) {
            li.classList.add("completed");
        }

        taskText.addEventListener("click", function () {
            task.completed = !task.completed;

            saveTasks();
            displayTasks();
        });


        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";

        editBtn.addEventListener("click", function () {
            const updatedText = prompt("Edit your task:", task.text);

            if (updatedText === null) {
                return;
            }

            const trimmedText = updatedText.trim();

            if (trimmedText === "") {
                alert("Task cannot be empty!");
                return;
            }

            task.text = trimmedText;

            saveTasks();
            displayTasks();
        });


        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function () {
            tasks = tasks.filter(function (item) {
                return item.id !== task.id;
            });

            saveTasks();
            displayTasks();
        });

        li.appendChild(taskText);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

displayTasks();

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    displayTasks();

    taskInput.value = "";
});

