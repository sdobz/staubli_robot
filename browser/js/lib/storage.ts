export function getItem(prefix: string, id: string) {
  return JSON.parse(localStorage.getItem(`${prefix}-${id}`) || "null");
}

export function setItem(
  prefix: string,
  item: { id: string },
  reduce: (item: any) => { id: string },
  sort: (a: any, b: any) => number
) {
  localStorage.setItem(`${prefix}-${item.id}`, JSON.stringify(item));

  const index = JSON.parse(localStorage.getItem(prefix) || "[]");
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

export function removeItem(prefix: string, item: { id: string }) {
  localStorage.removeItem(`${prefix}-${item.id}`);

  let index = JSON.parse(localStorage.getItem(prefix) || "[]");

  index = index.filter(({ id }) => id !== item.id);
  localStorage.setItem(prefix, JSON.stringify(index));
}

export function listItems(prefix: string) {
  return JSON.parse(localStorage.getItem(prefix) || "[]");
}

export function getSingle(key) {
  return JSON.parse(localStorage.getItem(key) || "null");
}

export function setSingle(key, value) {
  localStorage.setItem(key, value);
}
