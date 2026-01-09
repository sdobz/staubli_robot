export function getItem<T>(prefix: string, id: string): T | null {
  return JSON.parse(localStorage.getItem(`${prefix}-${id}`) || "null");
}

export function setItem<T extends { id: string }, R extends { id: string }>(
  prefix: string,
  item: T,
  reduce: (item: T) => R,
  sort: (a: R, b: R) => number
) {
  localStorage.setItem(`${prefix}-${item.id}`, JSON.stringify(item));

  const index: R[] = JSON.parse(localStorage.getItem(prefix) || "[]");
  const reducedItem = reduce(item);

  const existingIndex = index.findIndex((entry) => entry.id === item.id);
  if (existingIndex !== -1) {
    index[existingIndex] = reducedItem;
  } else {
    index.push(reducedItem);
  }

  index.sort(sort);
  localStorage.setItem(prefix, JSON.stringify(index));
}

export function removeItem<T extends { id: string }>(prefix: string, item: T) {
  localStorage.removeItem(`${prefix}-${item.id}`);

  let index: T[] = JSON.parse(localStorage.getItem(prefix) || "[]");

  index = index.filter(({ id }) => id !== item.id);
  localStorage.setItem(prefix, JSON.stringify(index));
}

export function listItems<T>(prefix: string): T[] {
  return JSON.parse(localStorage.getItem(prefix) || "[]");
}

export function getSingle<T>(key: string): T | null {
  return JSON.parse(localStorage.getItem(key) || "null");
}

export function setSingle<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}
