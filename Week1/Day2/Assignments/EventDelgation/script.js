let tasks = [];

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const sortBtn = document.getElementById("sortBtn");
const taskList = document.getElementById("taskList");

const filterAll = document.getElementById("filterAll");
const filterCompleted = document.getElementById("filterCompleted");
const filterIncomplete = document.getElementById("filterIncomplete");

const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const incompleteCount = document.getElementById("incompleteCount");

let currentFilter = "all";

addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  tasks.push({ text: taskText, completed: false });

  taskInput.value = "";
  renderTasks();
});

sortBtn.addEventListener("click", () => {
  tasks.sort((a, b) => a.text.localeCompare(b.text));
  renderTasks();
});

taskList.addEventListener("click", (e) => {
  const target = e.target;
  const index = target.closest("li")?.getAttribute("data-index");

  if (target.classList.contains("delete-btn")) {
    tasks.splice(index, 1);
    renderTasks();
  }

  if (target.classList.contains("checkbox")) {
    tasks[index].completed = target.checked;
    renderTasks();
  }
});

filterAll.addEventListener("click", () => {
  currentFilter = "all";
  renderTasks();
});

filterCompleted.addEventListener("click", () => {
  currentFilter = "completed";
  renderTasks();
});

filterIncomplete.addEventListener("click", () => {
  currentFilter = "incomplete";
  renderTasks();
});

function renderTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks;

  if (currentFilter === "completed") {
    filteredTasks = tasks.filter(task => task.completed);
  } else if (currentFilter === "incomplete") {
    filteredTasks = tasks.filter(task => !task.completed);
  }

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.setAttribute("data-index", index);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    checkbox.checked = task.completed;

    const span = document.createElement("span");
    span.textContent = task.text;
    span.style.textDecoration = task.completed ? "line-through" : "none";
    span.style.marginLeft = "8px";

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.classList.add("delete-btn");
    delBtn.style.marginLeft = "12px";

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);

    taskList.appendChild(li);
  });

  updateCounts();
}

function updateCounts() {
  totalCount.textContent = tasks.length;
  completedCount.textContent = tasks.filter(task => task.completed).length;
  incompleteCount.textContent = tasks.filter(task => !task.completed).length;
}