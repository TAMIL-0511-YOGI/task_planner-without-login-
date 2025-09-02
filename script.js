const taskTitle = document.getElementById("taskTitle");
const taskDesc = document.getElementById("taskDesc");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage
window.onload = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => renderTask(task));
};

// Add new task
addTaskBtn.addEventListener("click", () => {
  const title = taskTitle.value.trim();
  const desc = taskDesc.value.trim();
  const start = startDate.value;
  const end = endDate.value;

  if (title && desc && start && end) {
    const task = { title, desc, start, end };
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTask(task);
    clearInputs();
  } else {
    alert("Please fill in all fields!");
  }
});

// Render task to UI
function renderTask(task) {
  const li = document.createElement("li");

  li.innerHTML = `
    <h3>${task.title}</h3>
    <p>${task.desc}</p>
    <div class="dates">📅 ${task.start} → ${task.end}</div>
    <button class="delete-btn">✖</button>
  `;

  li.querySelector(".delete-btn").addEventListener("click", () => {
    li.remove();
    deleteTask(task);
  });

  taskList.appendChild(li);
}

// Delete task from localStorage
function deleteTask(taskToDelete) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = tasks.filter(task =>
    !(task.title === taskToDelete.title &&
      task.desc === taskToDelete.desc &&
      task.start === taskToDelete.start &&
      task.end === taskToDelete.end)
  );
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

// Clear input fields
function clearInputs() {
  taskTitle.value = "";
  taskDesc.value = "";
  startDate.value = "";
  endDate.value = "";
}