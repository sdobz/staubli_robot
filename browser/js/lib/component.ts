import { createEffect, createSignal } from "./state.js";

export function html(strings: TemplateStringsArray): HTMLTemplateElement {
  const templateElement = document.createElement("template");
  templateElement.innerHTML = strings.join("");
  return templateElement;
}

export type AttrMap = Record<
  string,
  {
    innerHTML?: string;
    attributes?: Record<string, string | undefined>;
    eventListeners?: Record<string, (e: Event) => void>;
    properties?: Record<string, any>;
  }
>;

export function createComponent<S>({
  tag,
  opts,
  observedAttributes,
  template,
  stateFn,
  attrsFn,
}: {
  tag: string;
  opts?: ElementDefinitionOptions;
  observedAttributes?: string[];
  template: HTMLTemplateElement;
  stateFn?: () => S;
  attrsFn: (state: S | undefined, attrs: Record<string, string>, element: HTMLElement) => AttrMap;
}): void {
  class Component extends HTMLElement {
    static observedAttributes = observedAttributes;
    eventListeners: Array<{ element: Element; type: string; listener: EventListenerOrEventListenerObject }> = [];
    attrsSignal!: () => Record<string, string>;
    setAttrsSignal!: (v: Record<string, string>) => void;

    constructor() {
      super();

      const state = stateFn ? stateFn() : undefined;

      const [attrs, setAttrs] = createSignal<Record<string, string>>({});
      this.attrsSignal = attrs;
      this.setAttrsSignal = setAttrs;

      const templateContent = template.content;

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

    disconnectedCallback() {}

    adoptedCallback() {
      console.log("Custom element moved to new page.");
    }

    attributeChangedCallback(_name: string, _oldValue: string | null, _newValue: string | null) {
      const attrs = this.getAllAttributes();
      this.setAttrsSignal(attrs);
    }

    getAllAttributes(): Record<string, string> {
      const attrs: Record<string, string> = {};

      for (const name of this.getAttributeNames()) {
        const v = this.getAttribute(name);
        if (v !== null) attrs[name] = v;
      }

      return attrs;
    }

    handleAttrMap(attrMap: AttrMap) {
      for (const { element, type, listener } of this.eventListeners) {
        element.removeEventListener(type, listener as EventListenerOrEventListenerObject);
      }

      this.eventListeners = [];
      for (const [selector, updates] of Object.entries(attrMap)) {
        const elements = this.querySelectorAll(selector);
        const { eventListeners, attributes, properties } = updates;

        for (const element of Array.from(elements)) {
          if (eventListeners) {
            for (const [type, listener] of Object.entries(eventListeners)) {
              this.eventListeners.push({ element, type, listener });
              element.addEventListener(type, listener as EventListenerOrEventListenerObject);
            }
          }

          if (properties) {
            for (const [property, propertyValue] of Object.entries(properties)) {
              // @ts-ignore dynamic property assignment
              (element as any)[property] = propertyValue;
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
