export const users = [
  { id: 1, name: "Болд", email: "bold@mail.com", password: "123" }
];
let nextId = 2;

export const findUserById = (id) => users.find(u => u.id === id);
export const findUserByEmail = (email) => users.find(u => u.email === email);

export function addUser(data) {
  const user = { id: nextId++, ...data };
  users.push(user);
  return user;
}

export function updateUser(id, changes) {
  const user = findUserById(id);
  if (!user) return null;
  delete changes.id;
  Object.assign(user, changes);
  return user;
}

export function removeUser(id) {
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
}