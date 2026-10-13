import { books } from "../data/books.js";

// Бүх номыг авах
export function getAllBooks(req, res) {
  res.json(books);
}

// Хайлт хийх
export function searchBooks(req, res) {
  const query = req.query.q || "";
  const filtered = books.filter((b) => b.title.toLowerCase().includes(query.toLowerCase()));
  res.json(filtered);
}

// ID-аар нь авах (Number болгож хувиргаж байна)
export function getBookById(req, res) {
  const id = Number(req.params.id);
  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.json(book);
}

// Шинэ ном нэмэх (return ашиглаж алдаанаас сэргийлсэн)
export function createBook(req, res) {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "title is required" });
  }

  const newBook = { id: books.length + 1, title };
  books.push(newBook);
  
  res.status(201).json(newBook);
}