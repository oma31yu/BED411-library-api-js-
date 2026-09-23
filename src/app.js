import express from "express";
import {
  books,
  findBookById,
  searchByTitle,
  getBooksFromDb,
  getBookOrThrow
} from "./books.js";

const app = express();
const PORT = 3000;

// 1. Root route
app.get("/", (req, res) => {
  res.json({
    message: "Library API",
    version: "1.0.0"
  });
});

// 2. Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime()
  });
});

// СЕМИНАР 2: BOOKS ROUTES (Async/Await ба Error Handling) //

app.get("/books", async (req, res) => {
  const q = req.query.q;
  const dbBooks = await getBooksFromDb(); // 0.5 секунд хүлээх

  if (q) {
    return res.json(
      dbBooks.filter((book) =>
        book.title.toLowerCase().includes(q.toLowerCase())
      )
    );
  }
  res.json(dbBooks);
});

app.get("/books/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const book = getBookOrThrow(id);
    res.json(book);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
});

// ========================================================== //

// Бусад хуучин route-ууд хэвээрээ
app.get("/profile", (req, res) => {
  res.json({
    name: "Bat",
    role: "USER",
    email: "bat@example.com"
  });
});

app.get("/about", (req, res) => {
  res.json({
    projectName: "Library API",
    version: "1.0.0",
    author: "Bat"
  });
});

app.get("/students", (req, res) => {
  res.json([
    { id: 1, name: "Bold", major: "Software Engineering" },
    { id: 2, name: "Nara", major: "Business Analytics" },
    { id: 3, name: "Temuulen", major: "Finance" }
  ]);
});

app.get("/courses", (req, res) => {
  res.json([
    { courseId: "CS101", title: "Node.js Backend Development", credits: 3 },
    { courseId: "CS102", title: "Database Systems", credits: 4 }
  ]);
});

// Серверийг асаах
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});