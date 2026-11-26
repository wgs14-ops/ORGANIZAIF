const STORAGE_KEY = "organizaif-tasks-v1";
const form = document.querySelector("#task-form");
const titleInput = document.querySelector("#title");
const subjectInput = document.querySelector("#subject");
const dueInput = document.querySelector("#due");
const list = document.querySelector("#task-list");
const empty = document.querySelector("#empty");

let tasks = loadTasks();

function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function formatDate(dateString) {
  if (!dateString) return "Sem prazo definido";
  const [year, month, day] = dateString.split("-");
  return `Prazo: ${day}/${month}/${year}`;
}

function render() {
  list.innerHTML = "";
  empty.hidden = tasks.length > 0;

  tasks.forEach((task) => {
    const item = document.createElement("article");
    item.className = `task${task.completed ? " completed" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `Marcar ${task.title} como concluída`);
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks();
      render();
    });

    const main = document.createElement("div");
    main.className = "task-main";

    const taskTitle = document.createElement("div");
    taskTitle.className = "task-title";
    taskTitle.textContent = task.title;

    const meta = document.createElement("div");
    meta.className = "task-meta";
    meta.textContent = `${task.subject} · ${formatDate(task.due)}`;

    const remove = document.createElement("button");
    remove.className = "delete-button";
    remove.type = "button";
    remove.textContent = "Excluir";
    remove.addEventListener("click", () => {
      tasks = tasks.filter((current) => current.id !== task.id);
      saveTasks();
      render();
    });

    main.append(taskTitle, meta);
    item.append(checkbox, main, remove);
    list.append(item);
  });

  document.querySelector("#total").textContent = tasks.length;
  document.querySelector("#pending").textContent = tasks.filter((task) => !task.completed).length;
  document.querySelector("#done").textContent = tasks.filter((task) => task.completed).length;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = titleInput.value.trim();
  if (!title) return;

  tasks.unshift({
    id: Date.now(),
    title,
    subject: subjectInput.value,
    due: dueInput.value,
    completed: false
  });

  saveTasks();
  form.reset();
  render();
  titleInput.focus();
});

render();
