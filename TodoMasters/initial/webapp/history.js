import { TodoList } from "./classes.js";

const todoList = TodoList.instance;

export const TodoHistory = {
    history: [],
    push(state) {
        this.history.push(new Set([...state]));
    },
    pop() {
        if (this.history.length < 2) return;
        this.history.pop(); // ignore current state
        const prevState = this.history.pop();
        todoList.replaceList(prevState);
    },
};

todoList.subscribe(() => {
    TodoHistory.push(todoList.items);
});
