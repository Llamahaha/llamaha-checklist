import { taskLibrary } from "./data/taskLibrary.js";

const form = document.getElementById("generatorForm");
const output = document.getElementById("output");

function generateChecklist({ type, environment }) {
  const tasks = taskLibrary
    .filter(task => task.type === type)
    .filter(task => {
      if (!task.conditions?.environment) return true;
      return task.conditions.environment.includes(environment);
    })
    .sort((a, b) => a.priority - b.priority);

  return tasks;
}

function renderChecklist(tasks) {
  output.innerHTML = "";

  tasks.forEach(task => {
    const section = document.createElement("div");
    section.className = "task";

    const title = document.createElement("h3");
    title.textContent = task.title;

    const list = document.createElement("ul");

    task.steps.forEach(step => {
      const li = document.createElement("li");
      li.textContent = step;
      list.appendChild(li);
    });

    section.appendChild(title);
    section.appendChild(list);

    output.appendChild(section);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const type = document.getElementById("type").value;
  const environment = document.getElementById("environment").value;

  const checklist = generateChecklist({ type, environment });

  renderChecklist(checklist);
});