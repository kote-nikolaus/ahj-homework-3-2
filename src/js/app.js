/* eslint-disable max-len */
/* eslint-disable no-shadow */

const inputArea = document.getElementById('field');
const allTasksList = document.getElementsByClassName('all-tasks-list')[0];
const pinnedTasks = document.getElementsByClassName('pinned-tasks-list')[0];
const allTasks = [];

class Task {
  constructor(name) {
    this.name = name;
    this.taskHTML = document.createElement('li');
    this.taskHTML.classList.add('task');
    this.taskHTML.innerHTML = `<div class='task-wrapper'><div class="task-title">${this.name}</div></div>`;
  }

  pinned() {
    return this.taskHTML.classList.contains('pinned-task');
  }
}

function pinTask(e, task) {
  e.preventDefault();
  const noPinnedTasks = document.getElementsByClassName('no-pinned-tasks')[0];
  if (!task.pinned()) {
    task.taskHTML.classList.add('pinned-task');
    pinnedTasks.appendChild(task.taskHTML);
    noPinnedTasks.style.display = 'none';
  } else {
    task.taskHTML.classList.remove('pinned-task');
    allTasksList.appendChild(task.taskHTML);
    if (pinnedTasks.children.length === 0) {
      noPinnedTasks.style.display = 'block';
    }
  }
}

function addTask(e) {
  if (e.keyCode === 13) {
    for (let i = 0; i < allTasks.length; i += 1) {
      allTasks[i].taskHTML.style.display = 'block';
    }
    const noTasksFound = document.getElementsByClassName('no-tasks-found')[0];
    noTasksFound.style.display = 'none';
    const task = new Task(inputArea.value);
    allTasksList.appendChild(task.taskHTML);
    allTasks.push(task);
    inputArea.value = '';
    task.taskHTML.addEventListener('click', (e) => pinTask(e, task));
  }
}

function findTask() {
  let showNoTasks = true;
  const noTasksFound = document.getElementsByClassName('no-tasks-found')[0];
  for (let i = 0; i < allTasks.length; i += 1) {
    if (!allTasks[i].pinned() && !allTasks[i].name.toLowerCase().includes(inputArea.value.toLowerCase())) {
      allTasks[i].taskHTML.style.display = 'none';
    } else {
      showNoTasks = false;
    }
  }
  if (showNoTasks) {
    noTasksFound.style.display = 'block';
  }
}

inputArea.addEventListener('input', findTask);
inputArea.addEventListener('keydown', addTask);
