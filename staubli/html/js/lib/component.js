// A component:
/*
Is a function that returns a map of css selector to attrs
And a template
That defines a custom element

When attrs are set on the element:

Runs the function
Selects each key
Updates attrs for values
*/

import { createEffect, createSignal } from "./state.js";

/** @type {(strings: string[]) => HTMLTemplateElement} */
export function html(strings) {
  const templateElement = document.createElement("template")
  templateElement.innerHTML = strings.join("")
  return templateElement
}

/**
 * @typedef {Record<string, {
 *   innerHTML?: string,
 *   attributes?: Record<string, string>,
 *   eventListeners?: Record<string, (e: Event) => void>,
 *   properties?: Record<string, any>
 * }>} AttrMap
 */

/** @type {<S>(setup: {tag: string, observedAttributes?: string[], template: HTMLTemplateElement, stateFn: () => S, attrsFn: (state: S, attrs: Record<string, string>) => AttrMap}) => void} */
export function createComponent({tag, observedAttributes, template, stateFn, attrsFn}) {
    class Component extends HTMLElement {
        static observedAttributes = observedAttributes
        eventListeners = [];

        constructor() {
            super();

            const boundAttrsFn = attrsFn.bind(this);
            const state = stateFn();

            const [attrs, setAttrs] = createSignal();
            this.attrsSignal = attrs;
            this.setAttrsSignal = setAttrs;

            const templateContent = template.content;

            const shadowRoot = this.attachShadow({ mode: "open" });
            shadowRoot.appendChild(templateContent.cloneNode(true));

            createEffect(() => {
                const effectAttrs = attrs()
                if (!effectAttrs) {
                    return
                }
                const attrsMap = boundAttrsFn(state, effectAttrs)
                this.handleAttrMap(attrsMap)
            })
        }
        connectedCallback() {
            const attrs = this.getAllAttributes()
            this.setAttrsSignal(attrs)
        }
    
        disconnectedCallback() {
            console.log("Custom element removed from page.");
        }
    
        adoptedCallback() {
            console.log("Custom element moved to new page.");
        }
    
        attributeChangedCallback(name, oldValue, newValue) {
            console.log(this, name, newValue)
            const attrs = this.getAllAttributes()
            this.setAttrsSignal(attrs)
        }
        
        getAllAttributes() {
            const attrs = {}

            for (const name of this.getAttributeNames()) {
                attrs[name] = this.getAttribute(name)
            }

            return attrs
        }

        /** @type {(attrMap: AttrMap) => void} */
        handleAttrMap(attrMap) {
            for (const {element, type, listener} of this.eventListeners) {
                element.removeEventListener(type, listener);
            }

            this.eventListeners = []
            for (const [selector, updates] of Object.entries(attrMap)) {
                const elements = this.shadowRoot.querySelectorAll(selector)
                console.log(selector, elements)
                const { eventListeners, innerHTML, attributes, properties } = updates

                for (const element of elements) {
                    if (innerHTML) {
                        element.innerHTML = innerHTML;
                    }
                    if (eventListeners) {
                        for (const [type, listener] of Object.entries(eventListeners)) {
                            this.eventListeners.push({element, type, listener})
                            element.addEventListener(type, listener)
                        }
                    }

                    if (properties) {
                        for (const [property, propertyValue] of Object.entries(properties)) {
                            element[property] = propertyValue
                        }
                    }

                    if (attributes) {
                        for (const [attr, attrValue] of Object.entries(attributes)) {
                            console.log(attr, attrValue)
                            element.setAttribute(attr, attrValue)
                        }
                    }
                }
            }
        }
    }

    customElements.define(tag, Component);
}
