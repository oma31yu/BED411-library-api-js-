export const books = [
  { id: 1, title: "Node.js", price: 25000 },
  { id: 2, title: "Express", price: 30000 }
];
let nextId = 3;

export const findBookById = (id) => books.find(b => b.id === id);

export function addBook(data) {
  const book = { id: nextId++, isAvailable: true, ...data };
  books.push(book);
  return book;
}

export function updateBook(id, changes) {
  const book = findBookById(id);
  if (!book) return null;
  delete changes.id;
  Object.assign(book, changes);
  return book;
}

export function removeBook(id) {
  const index = books.findIndex(b => b.id === id);
  if (index === -1) return false;
  books.splice(index, 1);
  return true;
}