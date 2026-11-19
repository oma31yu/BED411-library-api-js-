
import { prisma } from "../db.js";

// 1. БҮХ НОМЫГ АВАХ — GET /books
export async function getAllBooks(req, res) {
  try {
    const books = await prisma.book.findMany();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Номуудыг авахад алдаа гарлаа" });
  }
}

// 2. НОМ ХАЙХ — GET /books/search?title=Node
export async function searchBooks(req, res) {
  try {
    const { title } = req.query;

    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        message: "Хайх номын нэрийг оруулна уу",
      });
    }

    const books = await prisma.book.findMany({
      where: {
        title: {
          contains: title,
          mode: "insensitive",
        },
      },
    });

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Ном хайхад алдаа гарлаа" });
  }
}

// 3. ID-ААР НОМ АВАХ — GET /books/:id
export async function getBookById(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Номын ID буруу байна",
      });
    }

    const book = await prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      return res.status(404).json({
        message: "Ном олдсонгүй",
      });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Ном авахад алдаа гарлаа" });
  }
}

// 4. ШИНЭ НОМ НЭМЭХ — POST /books
export async function createBook(req, res) {
  try {
    const { title, price, author } = req.body;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      !Number.isInteger(price) ||
      price < 0 ||
      (author !== undefined &&
        (typeof author !== "string" || !author.trim()))
    ) {
      return res.status(400).json({
        message: "Номын нэр, үнэ эсвэл зохиогч буруу байна",
      });
    }

    const book = await prisma.book.create({
      data: {
        title: title.trim(),
        price,
        ...(author !== undefined && { author: author.trim() }),
      },
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: "Ном нэмэхэд алдаа гарлаа" });
  }
}

// 5. НОМЫН МЭДЭЭЛЭЛ ШИНЭЧЛЭХ — PATCH /books/:id
export async function updateBook(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Номын ID буруу байна",
      });
    }

    const allowedFields = [
      "title",
      "price",
      "author",
      "isAvailable",
    ];

    const data = Object.fromEntries(
      Object.entries(req.body).filter(([key]) =>
        allowedFields.includes(key)
      )
    );

    if (
      Object.keys(data).length === 0 ||
      (data.title !== undefined &&
        (typeof data.title !== "string" || !data.title.trim())) ||
      (data.price !== undefined &&
        (!Number.isInteger(data.price) || data.price < 0)) ||
      (data.author !== undefined &&
        data.author !== null &&
        (typeof data.author !== "string" || !data.author.trim())) ||
      (data.isAvailable !== undefined &&
        typeof data.isAvailable !== "boolean")
    ) {
      return res.status(400).json({
        message: "Шинэчлэх мэдээлэл буруу байна",
      });
    }

    if (typeof data.title === "string") {
      data.title = data.title.trim();
    }

    if (typeof data.author === "string") {
      data.author = data.author.trim();
    }

    const book = await prisma.book.update({
      where: { id },
      data,
    });

    res.status(200).json(book);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Ном олдсонгүй",
      });
    }

    res.status(500).json({
      message: "Ном шинэчлэхэд алдаа гарлаа",
    });
  }
}

// 6. НОМ УСТГАХ — DELETE /books/:id
export async function deleteBook(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Номын ID буруу байна",
      });
    }

    await prisma.book.delete({
      where: { id },
    });

    res.status(204).end();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Ном олдсонгүй",
      });
    }

    res.status(500).json({
      message: "Ном устгахад алдаа гарлаа",
    });
  }
}
