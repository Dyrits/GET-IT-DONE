const input = document.querySelector("#task-input");
const totalTasks = document.querySelector("#total");
const completedTasks = document.querySelector("#completed");
const modal = document.querySelector("#modal");
const maxRecentlyDeleted = 4;

loadData("totalTasks") || saveData("totalTasks", 0)
loadData("completedTasks") || saveData("completedTasks", 0)
loadData("toDoTheme") || saveData("toDoTheme", "light")

totalTasks.innerHTML = loadData("totalTasks");
completedTasks.innerHTML = loadData("completedTasks");


const deleteTaskOnClick = () => {
    console.log("Clicked!");
}

const updateTasks = () => {
    readTask(taskStore, (tasks) => {
        let list = document.querySelector("#task-list");
        list.innerHTML = String();
        tasks.forEach(task => {
            let li = document.createElement("li");
            li.innerHTML = task.title;
            li.setAttribute("data-id", task.id);
            li.addEventListener("click", deleteTaskOnClick);
            list.appendChild(li);
        })
    })
    readTask(completedTaskStore, (tasks) => {
        let list = document.querySelector("#completed-task-list");
        list.innerHTML = String();
        tasks.reverse().slice(0, maxRecentlyDeleted).forEach(task => {
            let li = document.createElement("li");
            li.innerHTML = `${task.title}: <span>${task.date}</span>`;
            li.className = "invert";
            list.appendChild(li);
        })
    })
}

input.addEventListener("keydown", ($event) => {
    if ($event.key === "Enter") {
        let task = new Task(input.value);
        input.value = String();
        if (task.title) {
            addTask(taskStore, task, () => {
                totalTasks.innerHTML = incrementData("totalTasks");
                updateTasks();
            })
        }
    }
})


const onLoad = () => {
    updateTasks();
}