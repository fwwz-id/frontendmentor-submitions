// todos-data
let todos = [
	{
		id: 1, // todo-id
		item: "Complete online JavaScript course", //todo-item
		status: "inactive", //todo-status
	},
	{
		id: 2,
		item: "Jog around the park 3x",
		status: "active",
	},
	{
		id: 3,
		item: "10 minutes meditation",
		status: "active",
	},
	{
		id: 4,
		item: "Read for 1 hour",
		status: "active",
	},
	{
		id: 5,
		item: "Pick up groceries",
		status: "active",
	},
	{
		id: 6,
		item: "Complete Todo App on Frontend Mentor",
		status: "active",
	},
];

// selector
const sortableField = document.querySelector(".sortable-field"),
	mood = document.body,
	mood_button = document.querySelector("a.mood-changer"),
	todo_counter = document.querySelector(".todo-counter"),
	filter_buttons = document.querySelectorAll(".todo-filter a"),
	clear_all_complete = document.querySelector(".action-clear"),
	modal = document.getElementById("modal"),
	modal_buttons = document.querySelectorAll(".modal-buttons a"),
	overlay = document.querySelector(".overlay");

// sortable.js
let draggableList = new Sortable(sortableField, {
	delay: 100,
	animation: 500,
	chosenClass: "sortable-effect",
});

/*                                    */
/*                                    */
/*          MAIN (FUNCTION)           */
/*                                    */
/*                                    */

function listOnClick(e) {
	let targetClass = e.target.classList;

	function getCurrentPosition(target) {
		return todos.filter((todo) => todo.item === target.innerHTML);
	}

	if (targetClass.contains("circle")) {
		// reach '.list .list-item' elem || this.nextSibling
		// he's two sibling, [.list-item, .close]
		let [list_item] = getAllElementSiblings(e.target);

		// get current element position in todos-data
		// this because we wanted to get todo-status, then we update that
		let [current] = getCurrentPosition(list_item);
		current.status === "active"
			? (current.status = "inactive")
			: (current.status = "active");
	} else if (targetClass.contains("list-item")) {
		// get current element position in todos-data
		// this because we wanted to get todo-status, then we update that
		let [current] = getCurrentPosition(e.target);
		current.status === "active"
			? (current.status = "inactive")
			: (current.status = "active");
	} else if (targetClass.contains("close")) {
		deleteTodo(e.target);
	}

	render();
}

function addTodo(e) {
	e.preventDefault();

	let value = e.target.children[0].value;

	todos = [
		...todos,
		{ id: new Date().getTime(), item: value, status: "active" },
	];

	console.log(
		`%ctodo %cis %csuccessfully %cupdated`,
		"font-family: monospace; color: #fb9300;", //red
		"font-family: monospace; color: #d7d7d8;", //white
		"font-family: monospace; color: #84bd00;", //green
		"font-family: monospace; color: #d7d7d8;" //white
	);
	render();
}

function clearAll(e) {
	e.preventDefault();

	let getInactive = todos.filter((todo) => todo.status === "active");

	todos = getInactive;

	render();
}

function deleteTodo(e) {
	// first array is div.circle, we skip that
	// second array is div.list-item, I wanted to get innerHTML and compare this with todo.item
	// so we can know the index, we use index to splice
	let [, list_item] = getAllElementSiblings(e);

	let [todoIndex] = todos.filter(
		(todo) => todo.item.indexOf(list_item.innerHTML) === 0
	);

	let [todo] = todos.splice(todos.indexOf(todoIndex), 1);
	console.log(
		`%c{ %citem: %c"${todo.item}", %cstatus: %c"${todo.status}" } %chas been %csuccessfully %cremoved.`,
		"font-family: monospace; ",
		"font-family: monospace; color: #ff0000;", //red
		"font-family: monospace; color: #fb9300;", //yellow
		"font-family: monospace; color: #ff0000;", //red
		"font-family: monospace; color: #fb9300", //yellow
		"font-family: monospace; color: #d7d7d8;", //white
		"font-family: monospace; color: #84bd00;", //green
		"font-family: monospace; color: #d7d7d8;" //white
	);
}

function themeHandler(e) {
	e.preventDefault();

	mood.classList.value !== "mood-light"
		? (mood.classList.replace(mood.classList.value, "mood-light"),
		  (mood_button.style.backgroundImage = 'url("../images/icon-moon.svg")'))
		: (mood.classList.replace(mood.classList.value, "mood-dark"),
		  (mood_button.style.backgroundImage = 'url("../images/icon-sun.svg")'));
}

// ! Warn complete THISSS
function filterTodo(e, dataset) {
	e.preventDefault();

	for (let button of filter_buttons) {
		if (e.target === button) {
			if (!e.target.classList.contains("active")) {
				e.target.classList.add("active");
			}
		} else {
			button.classList.remove("active");
		}
	}

	for (let child of sortableField.children) {
		if (dataset === "all") {
			return render();
		} else if (dataset === "active") {
			if (child.getAttribute("data-status") === "inactive") {
				hide(child);
			} else {
				show(child);
			}
		} else if (dataset === "inactive") {
			if (child.getAttribute("data-status") === "active") {
				hide(child);
			} else {
				show(child);
			}
		}
	}
}

/*                                    */
/*                                    */
/*          UTILS (FUNCTION)          */
/*                                    */
/*                                    */

// function for rendering todos when document loaded first time and re-render if there's update
function render() {
	// filtering inactive todo, so we can count how many todos is left
	let todos_status = todos
		.map((todo) => todo.status)
		.filter((todo) => todo === "active");

	// removing all todos,
	// so there's no stack or duplicated element while updating todo-list
	removeAllChildNodes(sortableField);

	// mapping todos, and create them as div.list element,
	// and then push them to sortableField
	todos.map((todo) => {
		const list = new Todo(todo.item, todo.status).CreateComponent();
		sortableField.append(list);
	});

	// count how many todos is left
	todo_counter.innerHTML = `${todos_status.length} item(s) left`;
}

// get all siblings
function getAllElementSiblings(e) {
	let siblings = [];

	// if e doesn't has siblings
	// return empty array
	if (!e.parentNode) {
		return siblings;
	}

	let sibling = e.parentNode.firstChild;

	while (sibling) {
		// Node.nodeType = 1, mean that's an element such as div, a, etc.
		// while Node.nodeType = 2, mean that's an attr of element
		// https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
		if (sibling.nodeType === 1 && sibling !== e) {
			siblings.push(sibling);
		}
		sibling = sibling.nextSibling;
	}
	return siblings;
}

// create handy event listener
function handyGlobalListener(type, selector, callback) {
	document.addEventListener(type, (e) => {
		if (e.target.matches(selector)) callback(e);
	});
}

function removeAllChildNodes(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}
// function to show elements
function show() {
	for (let element of arguments) {
		element.style.display = "flex";
	}
}

// function to hide elements
function hide() {
	for (let element of arguments) {
		element.style.display = "none";
	}
}

/*                                    */
/*                                    */
/*          	CLASS          		  */
/*                                    */
/*                                    */

class Todo {
	constructor(item, status) {
		this.item = item;
		this.status = status;
	}

	// a method that generate 'div' tag that has 'list' as class
	CreateComponent() {
		let list, list_item, circle, close;

		list = document.createElement("div");
		list_item = document.createElement("div");
		circle = document.createElement("div");
		close = document.createElement("div");

		// setting data-attr for list
		// this will be used when filtering content
		// filter all, active, or checked/completed
		list.setAttribute("data-status", this.status);

		list.classList.add("list");
		list_item.classList.add("list-item");
		circle.classList.add("circle");
		close.classList.add("close");

		list_item.innerHTML = this.item;

		list.append(circle, list_item, close);

		// list.addEventListener("click", listOnClick);

		return list;
	}
}

// running listener and functions

// runnin' listener
document.querySelector("form").addEventListener("submit", addTodo);
mood_button.addEventListener("click", themeHandler);
filter_buttons.forEach((e) =>
	e.addEventListener("click", (e) => filterTodo(e, e.target.dataset.show))
);

// running function
handyGlobalListener("click", "div", listOnClick);
render();
