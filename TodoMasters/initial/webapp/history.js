import { TodoList } from "./classes.js";

const todoList = TodoList.instance;

export const TodoHistory = {
    /** @type {import("./classes.js").Memento[]} */
    history: [],

    /**
     * @param {import("./classes.js").Memento} snapshot
     */
    push(snapshot) {
        this.history.push(snapshot);
    },

    pop() {
        if (this.history.length < 2) return;
        this.history.pop(); // ignore current state
        const prevSnapshot = this.history.pop();
        todoList.restore(prevSnapshot);
    },
};

todoList.subscribe(() => {
    TodoHistory.push(todoList.makeSnapshot());
});
