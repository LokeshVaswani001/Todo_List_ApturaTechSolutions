// Get tasks from Local Storage or initialize empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to save tasks in Local Storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 🔥 Enter key support
document.getElementById("taskInput")
  .addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      addTask();
    }
});

// Function to render tasks on UI
function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${task}</span>
      <div>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

    list.appendChild(li);
  });
}

// ✅ Add Task
function addTask() {
  const input = document.getElementById("taskInput");
  const value = input.value.trim();

  if (value === "") {
    alert("Please enter a task");
    return;
  }

  tasks.push(value);
  saveTasks();
  renderTasks();

  input.value = "";
}

// ✅ Delete Task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// ✅ Edit Task (Improved validation)
function editTask(index) {
  const updatedTask = prompt("Edit your task:", tasks[index]);

  if (updatedTask === null) return;

  const value = updatedTask.trim();

  if (value === "") {
    alert("Task cannot be empty");
    return;
  }

  tasks[index] = value;
  saveTasks();
  renderTasks();
}

// Load tasks when page loads
renderTasks();