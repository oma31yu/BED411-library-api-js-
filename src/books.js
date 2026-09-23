export const books = [
  { id: 1, title: "Node", price: 45000, isAvailable: true },
  { id: 2, title: "Express", price: 52000, isAvailable: true },
  { id: 3, title: "Prisma", price: 61000, isAvailable: false }
];

export function searchByTitle(keyword) {
  return books.filter((book) =>
    book.title.toLowerCase().includes(keyword.toLowerCase())
  );
}

export function findBookById(id) {
  return books.find((book) => book.id === id);
}

export function countAvailable() {
  return books.filter((b) => b.isAvailable).length;
}

// Семинар 2 - Database-ийг дүрсэлсэн Promise
export function getBooksFromDb() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(books);
    }, 500);
  });
}

// Семинар 2 - Алдаа шидэх функц
export function getBookOrThrow(id) {
  const book = findBookById(id);
  if (!book) {
    throw new Error("Book not found");
  }
  return book;
}