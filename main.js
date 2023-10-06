let taskInput = document.querySelector(".task-input input");
let addBtn = document.querySelector(".task-input  span");
let tasksContainer = document.querySelector(".tasks-container");
let noTasksDiv = document.querySelector(".no-tasks");
let tasksArr = [];

if (localStorage.getItem("Tasks")) {
  tasksArr = JSON.parse(localStorage.getItem("Tasks"));
}
if (tasksArr.length) {
  noTasksDiv.style.display = "none";
  tasksContainer.style.padding = "10px";
} else {
  noTasksDiv.style.display = "block";
  tasksContainer.style.padding = "0";
}
getDataFromLocalStorage();

addBtn.onclick = () => {
  if (taskInput.value !== "") {
    noTasksDiv.style.display = "none";
    tasksContainer.style.padding = "10px";
    function existedOrNot() {
      if (tasksArr.length) {
        let repeatedTask = tasksArr.filter((filter) => {
          return filter.taskText == taskInput.value;
        });
        if (repeatedTask.length === 0) {
          addTasksToArray(taskInput.value);
          taskInput.value = "";
          taskInput.focus();
        } else {
            document.querySelector(".again").style.transform = "translate(-50%,-50%) scale(1)";
            taskInput.style.pointerEvents = "none";
            document.querySelector(".again button").onclick = () => {
                document.querySelector(".again button").parentElement.style.transform = "translate(-50%,-50%) scale(0)" 
                taskInput.style.pointerEvents = "auto";
                taskInput.value = "";
                taskInput.focus();
            }
        return false;
        }
    } else {
        addTasksToArray(taskInput.value);
        taskInput.value = "";
        taskInput.focus();
    }
    }
    existedOrNot();
    }
};

//Click On Task Element
tasksContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    DeleteWith(e.target.parentElement.getAttribute("data-task"));
    e.target.parentElement.remove();
    if (tasksArr.length === 0) {
      noTasksDiv.style.display = "block";
      tasksContainer.style.padding = "0";
      console.log(tasksArr.length);
    }
  }
});
tasksContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("task-box")) {
    e.target.classList.toggle("completed");
    DoneOrNot(e.target);
  }
});
function addTasksToArray(value) {
  const taskObject = {
    id: Date.now(),
    taskText: value,
    done: false,
  };
  //Push tasks To the array of Tasks
  tasksArr.push(taskObject);
  addTaskToPage(tasksArr);
  addToLocalStorage(tasksArr);
}
function addTaskToPage(ArrayOfTasks) {
  tasksContainer.innerHTML = "";
  ArrayOfTasks.forEach((task) => {
    let taskBox = document.createElement("div");
    taskBox.className = "task-box";
    taskBox.setAttribute("data-task", task.id);
    if (task.done) {
      taskBox.className = "task-box completed";
    }
    let taskLabel = document.createElement("label");
    taskLabel.innerHTML = task.taskText;
    let deleteBtn = document.createElement("span");
    deleteBtn.className = "delete";
    deleteBtn.innerHTML = `x`;
    taskBox.append(taskLabel);
    taskBox.appendChild(deleteBtn);
    tasksContainer.appendChild(taskBox);
  });
}
function addToLocalStorage(arr) {
  localStorage.setItem("Tasks", JSON.stringify(arr));
}
function getDataFromLocalStorage() {
  let data = localStorage.getItem("Tasks");
  if (data) {
    let tasksFromData = JSON.parse(data);
    addTaskToPage(tasksFromData);
  }
}

function DeleteWith(taskId) {
  tasksArr = tasksArr.filter((task) => task.id != taskId);
  addToLocalStorage(tasksArr);
}

function DoneOrNot(task) {
  for (let i = 0; i < tasksArr.length; i++) {
    if (tasksArr[i].id == task.getAttribute("data-task")) {
      if (task.classList.contains("completed")) {
        tasksArr[i].done = true;

        addToLocalStorage(tasksArr);
      } else {
        tasksArr[i].done = false;
        addToLocalStorage(tasksArr);
      }
    }
  }
}

 
