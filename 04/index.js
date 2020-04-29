const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoPendingList = document.querySelector(".js-toDoPendingList"),
    toDoFinishedList = document.querySelector(".js-toDoFinishedList");

const TODOS_PENDING_LS = "pendingToDos";
const TODOS_FINISHED_LS = "finishedToDos";

let pendingToDos = [];
let finishedToDos = [];


function savePendingToDos() {
    localStorage.setItem(TODOS_PENDING_LS, JSON.stringify(pendingToDos));
}

function saveFinishedToDos() {
    localStorage.setItem(TODOS_FINISHED_LS, JSON.stringify(finishedToDos));
}

function deleteToDoByLi(li) {
    const ul = li.parentNode;

    if(ul.className === 'js-toDoPendingList') {
        toDoPendingList.removeChild(li);
        const cleanToDos = pendingToDos.filter(function(toDo) {
            return toDo.id !== parseInt(li.id);
        });
        pendingToDos = cleanToDos;
        savePendingToDos();
    } else if(ul.className === 'js-toDoFinishedList') {
        toDoFinishedList.removeChild(li);
        const cleanToDos = finishedToDos.filter(function(toDo) {
            return toDo.id !== parseInt(li.id);
        });
        finishedToDos = cleanToDos;
        saveFinishedToDos();

    }
    
}

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    deleteToDoByLi(li);
}

function toggleToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const ul = li.parentNode;
    deleteToDoByLi(li);
    if(ul.className === 'js-toDoPendingList') {
        addFinishedToDo(li.children[0].textContent);
    } else if(ul.className === 'js-toDoFinishedList') {
        addPendingToDo(li.children[0].textContent);
    }
}


function createToDoElement(toDoObj) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const toggleBtn = document.createElement("button");
    const span = document.createElement("span");

    span.innerText = toDoObj.text;
    li.appendChild(span);

    delBtn.innerText = "X";
    delBtn.addEventListener("click", deleteToDo);
    li.appendChild(delBtn);
    
    toggleBtn.innerText = "T";
    toggleBtn.addEventListener("click", toggleToDo);
    li.appendChild(toggleBtn);

    li.id = toDoObj.id;
    return li;
}

function addPendingToDo(text) {
    const newId = pendingToDos.length + 1;
    const toDoObj = {
        text: text,
        id: newId
    };
    
    const li = createToDoElement(toDoObj);
    toDoPendingList.appendChild(li);
    
    pendingToDos.push(toDoObj);
    savePendingToDos();
}

function addFinishedToDo(text) {
    console.log(text);
    const newId = finishedToDos.length + 1;
    const toDoObj = {
        text: text,
        id: newId
    };
    
    const li = createToDoElement(toDoObj);
    toDoFinishedList.appendChild(li);
    
    finishedToDos.push(toDoObj);
    saveFinishedToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    addPendingToDo(currentValue);
    toDoInput.value = "";
}


function loadToDos(TODOS_LS, addToDo) {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    console.log(loadedToDos);
    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            addToDo(toDo.text);
        });
    }
}


function init() {
    loadToDos(TODOS_PENDING_LS, (text) => addPendingToDo(text));
    loadToDos(TODOS_FINISHED_LS, (text) => addFinishedToDo(text));
    toDoForm.addEventListener("submit", handleSubmit);
}

init();