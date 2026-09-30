import * as db from "../data/books.js";

export const list = (req, res) => res.json({ count: db.books.length, data: db.books });

export const getOne = (req, res) => {
  const book = db.findBookById(Number(req.params.id));
  book ? res.json(book) : res.status(404).json({ message: "Not found" });
};

export const create = (req, res) => {
  if (!req.body.title) return res.status(400).json({ message: "title is required" });
  res.status(201).json(db.addBook(req.body));
};

export const update = (req, res) => {
  const updated = db.updateBook(Number(req.params.id), req.body);
  updated ? res.json(updated) : res.status(404).json({ message: "Not found" });
};

export const remove = (req, res) => {
  db.removeBook(Number(req.params.id)) ? res.status(204).send() : res.status(404).json({ message: "Not found" });
};