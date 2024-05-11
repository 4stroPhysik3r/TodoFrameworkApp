// ROUTING
const appRouter = new Router();

appRouter.addRoute("#/", renderHome);
appRouter.addRoute("#/active", renderActive);
appRouter.addRoute("#/completed", renderCompleted);

function renderHome() {
  setState("all");
  clearSelectedLink()

  document.querySelector("a[href='#/']").classList.add("selected");
  displayTodos();
}

function renderActive() {
  setState("active");
  clearSelectedLink()

  document.querySelector("a[href='#/active']").classList.add("selected")
  displayTodos();
}

function renderCompleted() {
  setState("completed");
  clearSelectedLink()

  document.querySelector("a[href='#/completed']").classList.add("selected");
  displayTodos();
}

function clearSelectedLink() {
  const links = document.querySelectorAll("a[href]");
  links.forEach(link => {
    link.classList.remove("selected");
  });
}

let todos = [
];


function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  let data = localStorage.getItem("todos");

  return JSON.parse(data);
}

function countTodos() {
  const incompleteTodos = todos.filter(todo => !todo.completed).length;
  let counts = document.querySelectorAll(".todo-count strong");

  counts.forEach(count => {
    count.innerHTML = incompleteTodos;
  });
}

function displayTodos() {
  let state = loadState();
  todos = loadTodos();

  const ul = document.querySelector(".todo-list");
  ul.innerHTML = "";

  const filteredTodos = state === "active" ? todos.filter(todo => !todo.completed) :
    state === "completed" ? todos.filter(todo => todo.completed) :
      todos;

  filteredTodos.forEach((todo) => {
    const li = createElement("li", { class: todo.completed ? "completed" : "" }, [
      createElement("input", { class: "toggle", type: "checkbox", checked: todo.completed ? "checked" : "" }),
      createElement("label", { id: todo.id }, [todo.text]),
      createElement("button", { class: "delete", id: todo.id, })
    ]);

    const toggleCheckbox = li.querySelector(".toggle");
    onClick(toggleCheckbox, () => {
      todo.completed = !todo.completed;
      saveTodos(todos)
      displayTodos();
    });

    const deleteTodo = li.querySelector(".delete");
    onClick(deleteTodo, () => {
      const todoId = parseInt(deleteTodo.getAttribute("id"));

      const todoIndex = todos.findIndex(todo => todo.id === todoId);
      if (todoIndex !== -1) {
        todos.splice(todoIndex, 1);
        saveTodos(todos);
        displayTodos();
      }
    })

    const editTodo = li.querySelector("label");
    onClick(editTodo, () => {
      editTodo.contentEditable = true;

      // Add event listener for the Enter key
      editTodo.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          const newText = editTodo.innerText;
          const todoId = parseInt(editTodo.getAttribute('id'));

          // Update the todo item with the new text
          const todoIndex = todos.findIndex(todo => todo.id === todoId);
          if (todoIndex !== -1) {
            todos[todoIndex].text = newText;
            saveTodos();
            displayTodos();
          }
        }
      })
    })

    ul.appendChild(li);
    countTodos();
  });
}

const clearCompleted = document.querySelector(".clear-completed");
onClick(clearCompleted, () => {
  let completedItems = document.querySelectorAll(".completed");

  completedItems.forEach(item => {
    item.remove();
  });
  todos = todos.filter(todo => !todo.completed);

  saveTodos(todos);
  displayTodos();
})

const addTodoToList = (todos) => {
  let text = document.getElementsByClassName("new-todo")[0].value;
  if (text.trim() !== "") {
    let newTodo = { id: Date.now(), text, completed: false };
    if (todos == null) {
      todos = []
    }

    todos.push(newTodo)
    saveTodos(todos)
  }
}

const newText = document.getElementsByClassName("new-todo")[0]
onEnterKeyPress(newText, () => {
  addTodoToList(todos);
  displayTodos()
  newText.value = "";
});

let selectAllChecked = false;
const selectAll = document.querySelector(".toggle-all");
onClick(selectAll, toggleAllTodos);

function toggleAllTodos() {
  todos = loadTodos();
  const areAllCompleted = todos.every(todo => todo.completed);

  selectAllChecked = !selectAllChecked;

  todos.forEach(todo => {
    todo.completed = !areAllCompleted;
  });

  saveTodos(todos);
  displayTodos();
}

document.addEventListener("DOMContentLoaded", displayTodos);