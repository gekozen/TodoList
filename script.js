//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const deleteList = document.querySelector(".deleteButton");

//event listener
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
deleteList.addEventListener("click", funcDeleteList);

function funcDeleteList() {
	window.localStorage.removeItem("todos");
	window.localStorage.removeItem("savedName");
	location.reload();
}


function addTodo(event) {
	//prevent form from submitting
	event.preventDefault();
	//don't create if todo is empty or already exists and animate input and button
	let todos;
	if (window.localStorage.getItem("todos") === null){
		todos = [];
	}else {
		todos = JSON.parse(window.localStorage.getItem("todos"));
	}
	if (todoInput.value === "" || todos.includes(todoInput.value) ){
		let placeToggle = document.querySelector(".todo-input");
		let placeToggle2 = document.querySelector(".todo-button");
			placeToggle.classList.add("todo-input2");
			placeToggle2.classList.add("todo-input2");
			setTimeout(myTimer, 200);
		function myTimer(){
			placeToggle.classList.remove("todo-input2");
			placeToggle2.classList.remove("todo-input2");
		}
		return;
	}
	//todo DIV
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");
	//Create LI
	const newTodo = document.createElement("li");
	newTodo.innerText = todoInput.value;
	newTodo.classList.add("todo-item");
	newTodo.setAttribute('id', 'testies');
	todoDiv.appendChild(newTodo);
	//ADD TODO TO LOCALSTORAGE
	saveLocalTodos(todoInput.value);
	//CHECK MARK BUTTON
	const completedButton = document.createElement("button");
	completedButton.innerHTML ='<i class="fa-solid fa-check"></i>';
	completedButton.classList.add("complete-btn");
	todoDiv.appendChild(completedButton);
	//CHECK TRASH BUTTON
	const trashButton = document.createElement("button");
	trashButton.innerHTML ='<i class="fa-solid fa-trash"></i>';
	trashButton.classList.add("trash-btn");
	todoDiv.appendChild(trashButton);
	//APPEND TO LIST
	todoList.appendChild(todoDiv);
	//Clear todo input value
	todoInput.value = "";
}

function deleteCheck(e){
	const item = e.target
	//DELETE TODO
	if (item.classList[0] === "trash-btn") {
		const todo = item.parentElement;
		//Animation
		todo.classList.add("fall");
		removeLocalTodos(todo);
		setInterval(myTimer, 500);
		function myTimer(){
			todo.remove();
		}
/*		todo.remove();*/
		}
	//CHECK MARK
	if (item.classList[0] === "complete-btn") {
		const todo = item.parentElement;
		const firstChild = item.parentElement.firstChild;
		firstChild.classList.toggle("complete");
		todo.classList.toggle("completed")
	}
}	

//Filtering of the todo list
function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) { 
        const mStyle = todo.style;  
        if(mStyle != undefined && mStyle != null){
            switch (e.target.value) {
                case "all":
                    mStyle.display = "flex";
                    break;
                case "completed":
                    if (todo.classList.contains('completed')) {
                        mStyle.display = 'flex';
                    } else {
                        mStyle.display = "none";
                    }
                    break;
                case "uncompleted":
                    if (todo.classList.contains('completed')){
                        mStyle.display = 'none';
                    }
                    else{
                        mStyle.display = "flex";
                    }
                    break;
            }
        }
    })
}

//save todo list to local storage
function saveLocalTodos(todo) {
	//Check if save already exists
	let todos;
	if (window.localStorage.getItem("todos") === null){
		todos = [];
	}else {
		todos = JSON.parse(window.localStorage.getItem("todos"));
	}
	//push new todo to local storage
	todos.push(todo);
	window.localStorage.setItem("todos", JSON.stringify(todos));

}

function getTodos() {
	//Check if save already exists
	let todos;
	if (window.localStorage.getItem("todos") === null){
		todos = [];
	}else {
		todos = JSON.parse(window.localStorage.getItem("todos"));
	}
	todos.forEach(function(todo){
	//todo DIV
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");
	//Create LI
	const newTodo = document.createElement("li");
	newTodo.innerText = todo;
	newTodo.classList.add("todo-item");
	newTodo.setAttribute('id', 'testies');
	todoDiv.appendChild(newTodo);
	//CHECK MARK BUTTON
	const completedButton = document.createElement("button");
	completedButton.innerHTML ='<i class="fa-solid fa-check"></i>';
	completedButton.classList.add("complete-btn");
	todoDiv.appendChild(completedButton);
	//CHECK TRASH BUTTON
	const trashButton = document.createElement("button");
	trashButton.innerHTML ='<i class="fa-solid fa-trash"></i>';
	trashButton.classList.add("trash-btn");
	todoDiv.appendChild(trashButton);
	//APPEND TO LIST
	todoList.appendChild(todoDiv);
	});
}


//remove todos from storage
function removeLocalTodos(todo) {
	//Check if save already exists
	let todos;
	if (window.localStorage.getItem("todos") === null){
		todos = [];
	}else {
		todos = JSON.parse(window.localStorage.getItem("todos"));
	}
	//remove item from todo list in storage
	const todoIndex = todo.children[0].innerText;
	todos.splice(todos.indexOf(todoIndex), 1);
	window.localStorage.setItem("todos", JSON.stringify(todos));
}

