import { TodoItem, TodoList } from "./classes.js";

const list = TodoList.instance;
const key = "todos";

export const AppStorage = {
    load() {
        const value = localStorage.getItem(key);
        if (!value) return;
        const array = JSON.parse(value);
        list.replaceList(new Set(array.map(TodoItem.fromJSON)));
    },
    save() {
        const array = Array.from(list.items);
        localStorage.setItem(key, JSON.stringify(array));
    },
};

list.subscribe(AppStorage.save);
