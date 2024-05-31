const formHigh = document.getElementById('todoFormHigh')
const formLow = document.getElementById('todoFormLow')

const highTaskListContainer = document.getElementById('containerHighStatus')
const lowTaskListContainer = document.getElementById('containerLowStatus')

const highStatus = document.getElementById('highStatus')
const lowStatus = document.getElementById('lowStatus')

const inputHighStatusTask = document.getElementById('addHighStatusTask') 
const inputLowStatusTask = document.getElementById('addLowStatusTask')

const toDo = document.querySelector('.todo__list')

/////array
const toDoListArray = []
let counter = 0

function addTask(currentForm) {
    event.preventDefault()

    if(currentForm.value === ''){
        alert('Пустое поле! Введите задачу.')
    } else {
        if(currentForm === inputHighStatusTask) {
            addTaskToArr(inputHighStatusTask.value, highStatus.textContent, counter, highTaskListContainer)
            //createTask(inputHighStatusTask, highTaskListContainer, counter)
            inputHighStatusTask.value = '';
            render()
            counter++
        } else if(currentForm === inputLowStatusTask) {
            addTaskToArr(inputLowStatusTask.value, lowStatus.textContent, counter, lowTaskListContainer)
            //createTask(inputLowStatusTask, lowTaskListContainer, counter)
            inputLowStatusTask.value = ''
            render()
            counter++
        }
    }


}

function addTaskToArr(taskName, taskStatus, id, ul) {
    toDoListArray.push({
        task: taskName,
        status: taskStatus,
        id: id,
        ul: ul,
        isDone: false
    })
}

function deleteTaskInArr(currentTask) {
    const currentIndex = toDoListArray.findIndex(item => item.id === Number(currentTask))
    toDoListArray.splice(currentIndex, 1)
}

function createTask(currentTaskName, taskId, ul, isDone) {
    let listContent;

    if (isDone) {
        listContent = `<div class="container__input"><input type="checkbox" checked class="checkbox__task" id="${taskId}"> <label for="${taskId}"><del>${currentTaskName}</del></label></div><button class="btn__remove"></button>`
    } else {
        listContent = `<div class="container__input"><input type="checkbox" class="checkbox__task" id="${taskId}"> <label for="${taskId}">${currentTaskName}</label></div><button class="btn__remove"></button>`
    }


    const li = document.createElement('li')
    li.classList.add('task')
    li.setAttribute('id', taskId)
    li.innerHTML = listContent

    if(isDone === true) {
        li.classList.add('checked')
    } else {
        li.classList.remove('checked')
    }

    ul.appendChild(li)
}

function deleteTask(event) {
    if(event.target.className === 'btn__remove' && event.target.closest('li').className === 'task') {
        const currentTask = event.target.closest('li').getAttribute('id')
        deleteTaskInArr(currentTask)

        render()
    }
}

function render() {
    highTaskListContainer.innerHTML = '';
    lowTaskListContainer.innerHTML = '';

    for (let task of toDoListArray) {
        createTask(task.task, task.id, task.ul, task.isDone)
    } 
}

function toggle(event) {
    if(event.target.className === 'checkbox__task') {
        const clickedTaskId = event.target.closest('li').getAttribute('id')
        const clickedTask = toDoListArray.find(item => item.id == clickedTaskId)
        clickedTask.isDone = !clickedTask.isDone;
        
        render()
    } else {
        console.log('no')
    }

}

toDo.addEventListener('click', deleteTask)
toDo.addEventListener('click', toggle) 

formHigh.addEventListener('submit', () => {addTask(inputHighStatusTask)})
formLow.addEventListener('submit', () => {addTask(inputLowStatusTask)})


