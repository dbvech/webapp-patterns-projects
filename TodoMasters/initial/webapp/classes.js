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
}

Object.assign(TodoList.prototype, observerMixin);
