import express from "express";

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

// 3. Profile route
app.get("/profile", (req, res) => {
  res.json({
    name: "Bat",
    role: "USER",
    email: "bat@example.com"
  });
});

// 4. Books dynamic parameter route
app.get("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  res.json({
    id: id,
    title: "Node.js Basics"
  });
});


// /about route
app.get("/about", (req, res) => {
  res.json({
    projectName: "Library API",
    version: "1.0.0",
    author: "Bat"
  });
});

// /students route
app.get("/students", (req, res) => {
  res.json([
    { id: 1, name: "Bold", major: "Software Engineering" },
    { id: 2, name: "Nara", major: "Business Analytics" },
    { id: 3, name: "Temuulen", major: "Finance" }
  ]);
});

// /courses route
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