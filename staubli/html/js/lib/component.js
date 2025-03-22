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

/** @type {(strings: TemplateStringsArray) => HTMLTemplateElement} */
export function html(strings) {
  const templateElement = document.createElement("template");
  templateElement.innerHTML = strings.join("");
  return templateElement;
}

/**
 * @typedef {Record<string, {
 *   innerHTML?: string,
 *   attributes?: Record<string, string | undefined>,
 *   eventListeners?: Record<string, (e: Event) => void>,
 *   properties?: Record<string, any>
 * }>} AttrMap
 */

/** @type {<S>(setup: {tag: string, opts?: ElementDefinitionOptions, observedAttributes?: string[], template: HTMLTemplateElement, stateFn?: () => S, attrsFn: (state: S, attrs: Record<string, string>, element: HTMLElement) => AttrMap}) => void} */
export function createComponent({
  tag,
  opts,
  observedAttributes,
  template,
  stateFn,
  attrsFn,
}) {
  class Component extends HTMLElement {
    static observedAttributes = observedAttributes;
    eventListeners = [];

    constructor() {
      super();

      const state = stateFn ? stateFn() : undefined;

      const [attrs, setAttrs] = createSignal({});
      this.attrsSignal = attrs;
      this.setAttrsSignal = setAttrs;

      const templateContent = template.content;

      // const shadowRoot = this.attachShadow({ mode: "open" });
      // document.querySelectorAll("link").forEach(linkElement => {
      //   shadowRoot.appendChild(linkElement.cloneNode());
      // })
      // shadowRoot.appendChild(templateContent.cloneNode(true));

      this.appendChild(templateContent.cloneNode(true));


      createEffect(() => {
        const effectAttrs = attrs();
        if (!effectAttrs) {
          return;
        }
        const attrsMap = attrsFn(state, effectAttrs, this);
        this.handleAttrMap(attrsMap);
      });
    }
    connectedCallback() {
      const attrs = this.getAllAttributes();
      this.setAttrsSignal(attrs);
    }

    disconnectedCallback() {
    }

    adoptedCallback() {
      console.log("Custom element moved to new page.");
    }

    attributeChangedCallback(name, oldValue, newValue) {
      const attrs = this.getAllAttributes();
      this.setAttrsSignal(attrs);
    }

    getAllAttributes() {
      const attrs = {};

      for (const name of this.getAttributeNames()) {
        attrs[name] = this.getAttribute(name);
      }

      return attrs;
    }

    /** @type {(attrMap: AttrMap) => void} */
    handleAttrMap(attrMap) {
      for (const { element, type, listener } of this.eventListeners) {
        element.removeEventListener(type, listener);
      }

      this.eventListeners = [];
      for (const [selector, updates] of Object.entries(attrMap)) {
        const elements = this.querySelectorAll(selector);
        const { eventListeners, attributes, properties } = updates;

        for (const element of elements) {
          if (eventListeners) {
            for (const [type, listener] of Object.entries(eventListeners)) {
              this.eventListeners.push({ element, type, listener });
              element.addEventListener(type, listener);
            }
          }

          if (properties) {
            for (const [property, propertyValue] of Object.entries(
              properties
            )) {
              element[property] = propertyValue;
            }
          }

          if (attributes) {
            for (const [attr, attrValue] of Object.entries(attributes)) {
              if (attrValue) {
                element.setAttribute(attr, attrValue);
              } else {
                element.removeAttribute(attr);
              }
            }
          }
        }
      }
    }
  }

  customElements.define(tag, Component, opts);
}
