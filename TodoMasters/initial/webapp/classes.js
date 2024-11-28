import { observerMixin } from "./mixin.js";

export class TodoItem {
    text = "";

    /**
     * @param {string} text
     */
    constructor(text) {
        this.text = text;
    }

    /**
     * @param {unknown} other
     * @returns {boolean}
     */
    equals(other) {
        return other instanceof TodoItem && this.text === other.text;
    }

    static fromJSON(json) {
        return new TodoItem(json.text);
    }
}

export class Memento {}

class TodoListSnapshot extends Memento {
    #list;

    constructor(list) {
        super();
        this.#list = [...list];
    }

    restore(todoList) {
        todoList.replaceList(new Set(this.#list));
    }
}

export class TodoList {
    /** @type {Set<TodoItem>} */
    #data = new Set();

    get items() {
        return this.#data;
    }

    // Singleton
    /** @type {TodoList} */
    static #instance = null;

    static get instance() {
        return TodoList.#instance;
    }

    constructor() {
        if (TodoList.instance) {
            throw new Error("To get instance use `TodoList.instance`");
        }
    }

    static {
        TodoList.#instance = new TodoList();
    }

    /**
     * @param {TodoItem} item - The item to add
     */
    add(item) {
        if (!(item instanceof TodoItem)) {
            throw new Error("The item must be instance of TodoItem");
        }
        const itemInList = Array.from(this.#data).find((i) => i.equals(item));
        if (!itemInList) {
            this.#data.add(item);
            this.notify();
        }
    }

    /**
     * @param {string} text - text of TodoItem to search
     * @returns {TodoItem | undefined}
     */
    find(text) {
        return Array.from(this.#data).find((i) => i.text === text);
    }

    /**
     * @param {string} text - the text of item to delete
     */
    delete(text) {
        const itemInList = Array.from(this.#data).find((i) => i.text === text);
        if (itemInList) {
            this.#data.delete(itemInList);
            this.notify();
        }
    }

    /**
     * @param {TodoItem[]} list - The list to replace
     */
    replaceList(list) {
        this.#data = list;
        this.notify();
    }

    /**
     * @returns {Memento} snapshot
     */
    makeSnapshot() {
        return new TodoListSnapshot(this.items);
    }

    /**
     * @param {Memento} snapshot
     */
    restore(snapshot) {
        if (snapshot instanceof TodoListSnapshot) {
            snapshot.restore(this);
        } else {
            throw new Error();
        }
    }
}

Object.assign(TodoList.prototype, observerMixin);
