import { TodoList } from "./webapp/classes.js";
import { Command, CommandExecutor, Commands } from "./webapp/command.js";
import { AppStorage } from "./webapp/storage.js";

const DOM = {};
globalThis.DOM = DOM;

document.addEventListener("DOMContentLoaded", () => {
    DOM.todoInput = document.getElementById("todo-input");
    DOM.addBtn = document.getElementById("add-btn");
    DOM.todoList = document.getElementById("todo-list");

    DOM.addBtn.addEventListener("click", () => {
        CommandExecutor.execute(new Command(Commands.ADD));
    });

    DOM.todoList.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-btn")) {
            const todoText = event.target.parentElement.dataset.todoText;
            CommandExecutor.execute(new Command(Commands.DELETE, [todoText]));
        }
    });

    TodoList.instance.subscribe(renderList);
    AppStorage.load();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        CommandExecutor.execute(new Command(Commands.ADD));
    }
});

function renderList() {
    DOM.todoList.innerHTML = "";

    TodoList.instance.items.forEach((todo) => {
        const listItem = document.createElement("li");
        listItem.className = "todo-item";
        listItem.dataset.todoText = todo.text;
        listItem.innerHTML = `${todo.text} <button class="delete-btn">Delete</button>`;
        DOM.todoList.appendChild(listItem);
    });
}
