import * as db from "../data/users.js";

// Password-ийг буцаахгүй байх туслах function
const hidePassword = (user) => {
  const { password, ...safe } = user;
  return safe;
};

export const list = (req, res) => {
  res.json({ count: db.users.length, data: db.users.map(hidePassword) });
};

export const getOne = (req, res) => {
  const user = db.findUserById(Number(req.params.id));
  user ? res.json(hidePassword(user)) : res.status(404).json({ message: "User not found" });
};

export const create = (req, res) => {
  const { email, name, password } = req.body;
  if (!email) return res.status(400).json({ message: "email is required" });
  if (db.findUserByEmail(email)) return res.status(409).json({ message: "Email already exists" });

  const user = db.addUser({ name, email, password });
  res.status(201).json(hidePassword(user));
};

export const update = (req, res) => {
  const id = Number(req.params.id);
  if (req.body.email) {
    const exist = db.findUserByEmail(req.body.email);
    if (exist && exist.id !== id) return res.status(409).json({ message: "Email already exists" });
  }

  const updated = db.updateUser(id, req.body);
  updated ? res.json(hidePassword(updated)) : res.status(404).json({ message: "User not found" });
};

export const remove = (req, res) => {
  db.removeUser(Number(req.params.id)) ? res.status(204).send() : res.status(404).json({ message: "User not found" });
};