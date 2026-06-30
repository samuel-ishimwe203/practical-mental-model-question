import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

const DATA_FILE = "./data.json";

export const getItems = async () => {
  const data = await fs.readFile(DATA_FILE, "utf8").catch(() => "[]");
  return JSON.parse(data);
};

export const createItem = async (newItem) => {
  const items = await getItems();
  const itemWithId = { id: uuidv4(), ...newItem };
  items.push(itemWithId);
  await fs.writeFile(DATA_FILE, JSON.stringify(items));
  return itemWithId;
};

export const updateItem = async (id, updatedData) => {
  const items = await getItems();
  const index = items.findIndex(item => item.id == id);
  if (index === -1) return null;
  items[index] = { ...items[index], ...updatedData };
  await fs.writeFile(DATA_FILE, JSON.stringify(items));
  return items[index];
};

export const deleteItem = async (id) => {
  const items = await getItems();
  const initialLength = items.length;
  const filtered = items.filter(item => item.id != id);
  if (filtered.length === initialLength) return false;
  await fs.writeFile(DATA_FILE, JSON.stringify(filtered));
  return true;
};
