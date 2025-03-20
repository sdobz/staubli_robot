// Credit Ryan Carniato https://frontendmasters.com/courses/reactivity-solidjs/

let context = [];

export function untrack(fn) {
    const prevContext = context;
    context = [];
    const res = fn();
    context = prevContext;
    return res;
}

function cleanup(observer) {
    for (const dep of observer.dependencies) {
        dep.delete(observer);
    }
    observer.dependencies.clear();
}

function subscribe(observer, subscriptions) {
    subscriptions.add(observer);
    observer.dependencies.add(subscriptions);
}

/** @type {<T>(value: T) => readonly [() => T, (value: T) => void]} */
export function createSignal(value) {
    const subscriptions = new Set();

    const read = () => {
        const observer = context[context.length - 1]
        if (observer) subscribe(observer, subscriptions);
        return value;
    }
    const write = (newValue) => {
        value = newValue;
        for (const observer of [...subscriptions]) {
            observer.execute();
        }
    }

    return [read, write];
}

export function createEffect(fn) {
    const effect = {
        execute() {
            cleanup(effect);
            context.push(effect);
            fn();
            context.pop();
        },
        dependencies: new Set()
    }

    effect.execute();
}

/**
 * Creates a memoized signal that updates whenever the value of `fn` changes.
 *
 * @template T - The return type of the `fn` function.
 * @param {() => T} fn - A function that returns a value of type `T`.
 * @returns {() => T} - A signal function that returns the latest value of `fn`.
 */
export function createMemo(fn) {
    const [signal, setSignal] = createSignal(null);
    createEffect(() => setSignal(fn()));
    return signal;
}
