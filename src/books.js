// Жишээ өгөгдөл
export const books = [
  { id: 1, title: "Node", price: 45000, isAvailable: true },
  { id: 2, title: "Express", price: 52000, isAvailable: true },
  { id: 3, title: "Prisma", price: 61000, isAvailable: false },
];

// 0.5 секунд хүлээгээд буцаадаг функц
export const getBooksFromDb = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(books), 500);
  });
};

// ID-аар хайх (байхгүй бол шууд алдаа шидэх)
export const getBookOrThrow = (id) => {
  const book = books.find((b) => b.id === id);
  if (!book) {
    throw new Error("Book not found");
  }
  return book;
};