// Credit Ryan Carniato https://frontendmasters.com/courses/reactivity-solidjs/

let context = [];


interface Observer {
    execute?: () => void;
    dependencies: Set<Set<Observer>>;
}

export function untrack(fn: () => any) {
    const prevContext = context;
    context = [];
    const res = fn();
    context = prevContext;
    return res;
}

export function cleanup(observer: Observer) {
    for (const dep of observer.dependencies) {
        dep.delete(observer);
    }
    observer.dependencies.clear();
}

function subscribe(observer: Observer, subscriptions: Set<Observer>) {
    subscriptions.add(observer);
    observer.dependencies.add(subscriptions);
}

export function createSignal<T>(value: T): readonly [() => T, (value: T) => void] {
    const subscriptions = new Set<Observer>();

    const read = () => {
        const observer = context[context.length - 1]
        if (observer) subscribe(observer, subscriptions);
        return value;
    }
    const write = (newValue: T) => {
        value = newValue;
        for (const observer of [...subscriptions]) {
            observer.execute();
        }
    }

    return [read, write];
}

export function createEffect(fn: () => void) {
    const effect: Observer = {
        execute() {
            cleanup(effect);
            context.push(effect);
            try {
                fn();
            } finally {
                context.pop();
            }
        },
        dependencies: new Set()
    }

    effect.execute();
    return () => cleanup(effect);
}

export function createMemo<T>(fn: () => T): () => T {
    const [signal, setSignal] = createSignal(null);
    createEffect(() => setSignal(fn()));
    return signal;
}
