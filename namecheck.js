//get username from user

let savedName;
	if (window.localStorage.getItem("savedName") === null){
		savedName = prompt("Hi. What is your name?");
	}else {
		savedName = JSON.parse(window.localStorage.getItem("savedName"));
	}
//If cancel button or no name is entered..
if (savedName === null || savedName === "") {
		savedName = "Mr. Nobody"
	};

window.localStorage.setItem("savedName", JSON.stringify(savedName));

document.getElementById("todoName").innerText = savedName + "\'s todo list!"

//Selectors
const nameButton = document.querySelector(".reinputNameButton");

//event listeners
nameButton.addEventListener("click", funcSavedName);

//functions
function funcSavedName(){
	savedName = prompt("Hi. What is your name?");
	if (savedName === null || savedName === "") {
		return;
	}else {
	window.localStorage.setItem("savedName", JSON.stringify(savedName));
	document.getElementById("todoName").innerText = savedName + "\'s todo list!"
	}
	
};
