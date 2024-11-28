import { TodoItem, TodoList } from "./classes.js";

export class Command {
    /** @type {Commands[keyof Commands]} */
    name;
    /** @type {any[] | undefined} */
    args;

    /**
     * @param {Commands[keyof Commands]} name
     * @param {any[] | undefined} args
     */
    constructor(name, args) {
        this.name = name;
        this.args = args;
    }
}

export const Commands = /** @type {const} */ ({
    ADD: "add",
    DELETE: "delete",
});

export const CommandExecutor = {
    /**
     * @param {Command} command
     */
    execute(command) {
        const todoList = TodoList.instance;
        switch (command.name) {
            case Commands.ADD: {
                const todoInput = globalThis.DOM.todoInput;
                const todoText = todoInput.value.trim();
                const itemInList = todoList.find(todoText);
                if (itemInList) return;
                if (todoText === "") return;
                todoList.add(new TodoItem(todoText));
                todoInput.value = "";
                break;
            }

            case Commands.DELETE: {
                const [text] = command.args;
                todoList.delete(text);
                break;
            }

            default:
                throw new Error(`Unknown command - ${command.name}`);
        }
    },
};
