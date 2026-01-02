/**
 * @param {string} prefix 
 * @param {string} id 
 */
export function getItem(prefix, id) {
    return JSON.parse(localStorage.getItem(`${prefix}-${id}`) || "null")
}

/**
 * 
 * @param {string} prefix 
 * @param {({id: string})} item
 * @param {(item: any) => ({id: string})} reduce 
 * @param {(a: any, b: any) => number} sort 
 */
export function setItem(prefix, item, reduce, sort) {
    localStorage.setItem(`${prefix}-${item.id}`, JSON.stringify(item));

    const index = JSON.parse(localStorage.getItem(prefix) || "[]");
    const reducedItem = reduce(item);
    
    const existingIndex = index.findIndex(entry => entry.id === item.id);
    if (existingIndex !== -1) {
        index[existingIndex] = reducedItem;
    } else {
        index.push(reducedItem);
    }

    index.sort(sort);
    localStorage.setItem(prefix, JSON.stringify(index));
}

/**
 * @param {string} prefix 
 * @param {{id: string}} item 
 */
export function removeItem(prefix, item) {
    localStorage.removeItem(`${prefix}-${item.id}`)

    let index = JSON.parse(localStorage.getItem(prefix) || "[]");

    index = index.filter(({id}) => id !== item.id)
    localStorage.setItem(prefix, JSON.stringify(index))
}

/**
 * @param {string} prefix 
 */
export function listItems(prefix) {
    return JSON.parse(localStorage.getItem(prefix) || "[]")
}

export function getSingle(key) {
    return JSON.parse(localStorage.getItem(key) || "null")
}

export function setSingle(key, value) {
    localStorage.setItem(key, value)
}
