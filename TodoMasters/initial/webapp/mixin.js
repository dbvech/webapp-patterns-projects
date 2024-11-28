export const observerMixin = {
    observers: new Set(),
    subscribe(obs) {
        this.observers.add(obs);
    },
    unsubscribe(obs) {
        this.observers.delete(obs);
    },
    notify(data) {
        this.observers.forEach((obs) => obs(data));
    },
};
