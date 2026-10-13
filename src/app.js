import express from "express";
import booksRouter from "./routes/books.router.js"; // .js өргөтгөлтэй байх ёстой
import { logger } from "./middlewares/logger.js";
import { notFound, errorHandler } from "./middlewares/error.js";

const app = express();

// 1. Бэлтгэл хэсэг: Parser болон Logger хамгийн дээр
app.use(express.json());
app.use(logger);

// 2. Ажил хэсэг: Router-ийг "/books" префикстэй холбох
app.use("/books", booksRouter);

// 3. Цэвэрлэгээ хэсэг: 404 болон Error handler хамгийн доор
app.use(notFound);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});