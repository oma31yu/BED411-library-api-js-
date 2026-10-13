import express from "express";
import { 
  getAllBooks, 
  searchBooks, 
  getBookById, 
  createBook 
} from "../controllers/books.controller.js";

const router = express.Router();

// Чухал: /search хаягийг /:id-аас ДЭЭР нь бичих ёстой
router.get("/search", searchBooks);
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", createBook);

export default router;