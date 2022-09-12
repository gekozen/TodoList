//take username from user

let savedName;
	if (window.localStorage.getItem("savedName") === null){
		savedName = prompt("Hi. What is your name?");
	}else {
		savedName = JSON.parse(window.localStorage.getItem("savedName"));
	}

window.localStorage.setItem("savedName", JSON.stringify(savedName));

document.getElementById("todoName").innerText = savedName + "\'s todo list!"



