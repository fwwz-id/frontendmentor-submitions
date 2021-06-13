let data = [
	"Complete online JavaScript course",
	"Jog around the park 3x",
	"10 minutes meditation",
	"Read for 1 hour",
	"Pick up groceries",
	"Complete Todo App on Frontend Mentor",
];

const moodBtn = document.querySelector("a.mood-changer"),
	form = document.querySelector("form"),
	todoFilters = document.querySelectorAll(".todo-filter a"),
	todoCounter = document.querySelector(".todo-counter"),
	mood = document.body.classList,
	modal = document.getElementById("modal");

let sortableField = document.querySelector(".sortable-field"),
	list;

// Mood conditioner
moodBtn.addEventListener("click", function (e) {
	e.preventDefault();

	mood.value === "mood-light"
		? (mood.replace(mood.value, "mood-dark"),
		  (moodBtn.style.backgroundImage = 'url("../images/icon-sun.svg")'))
		: (mood.replace(mood.value, "mood-light"),
		  (moodBtn.style.backgroundImage = 'url("../images/icon-moon.svg")'));
});

// counter

// filter
todoFilters.forEach((todoFilter) => {
	todoFilter.addEventListener("click", todoFilterHandler);
});
//                                  //
//          FUNCTIONS               //
//                                  //
//                                  //

window.addEventListener("DOMContentLoaded", function () {
	data.map((elem, i) => {
		list = new Todo(elem).newTodo();
		i === 0 ? list.classList.add("completed") : null;
		sortableField.appendChild(list);
	});

	counter();
});

form.addEventListener("submit", submitFunc);

// create function submit
function submitFunc(e) {
	e.preventDefault();
	data.push(e.target.children[0].value);

	let newList = new Todo(data[data.length - 1]).newTodo();
	sortableField.appendChild(newList);

	todoCounter.innerHTML = counter();
}

function removeElemAndUpdtData(i) {
	let pos = data.indexOf(i.target.parentNode.innerText);
	data.splice(pos, 1);
	i.target.parentElement.remove();
	todoCounter.innerHTML = counter();
}

function counter() {
	let eachList = document.querySelectorAll(".list"),
		lengthList = eachList.length,
		completed;

	for (let val of eachList) {
		completed = val.classList.contains("completed");
		console.log(lengthList - completed);
	}

	todoCounter.innerHTML = `${lengthList} item(s) left`;
}

function todoFilterHandler(e) {
	e.preventDefault();
	const boys = this.parentElement.children;
}

function modalHandler() {
	console.log(`Modal handler executed`);
	return false;
}

//
//  CLASS
//
class Todo {
	constructor(newItem) {
		this.newItem = newItem;
	}

	newTodo() {
		// create list elem (list, circle, close tags)
		let listItem = document.createElement("div"),
			circle = document.createElement("div"),
			close = document.createElement("div");

		circle.classList.add("circle");
		close.classList.add("close");

		listItem.classList.add("list-item");
		listItem.innerHTML = this.newItem; //Push new item into list-item
		list = document.createElement("div");
		list.className = "list";

		list.appendChild(circle);
		list.appendChild(listItem);
		list.appendChild(close);

		this.deleteAndTroughHandler(list);
		return list;
	}

	deleteAndTroughHandler(list) {
		list.addEventListener("click", function (e) {
			let list_classlist = e.target.classList;
			list_classlist.contains("list-item") || list_classlist.contains("circle")
				? ((todoCounter.innerHTML = counter()),
				  e.target.parentNode.classList.toggle("completed"))
				: list_classlist.contains("close")
				? modalHandler()
					? removeElemAndUpdtData(e)
					: null
				: null;
		});
	}
}
