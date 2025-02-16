import { createComponent } from "./component.js";
import { createSignal, createEffect, createMemo } from "./state.js"

createComponent('robot-button', () => {
    const [count, setCount] = createSignal(0)

    return { count, setCount }
}, ({ count, setCount }, attrs) => {
    const click = () => {
        setCount(count() + 1)
    }

    return {
        "button": {
            innerHTML: `${attrs['button-text']} (${count()})`,
            eventListeners: { click }
        }
    }
})
