import express from "express";
import fs from "fs/promises";

const app = express();
const DATA_FILE = "./data.json";
app.use(express.json());

app.get("/items", async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8").catch(() => []);
    const items = JSON.parse(data);
    return res
      .status(200)
      .json({ message: "data has been retrived ", data: items });
  } catch (error) {
    res.status(500).json({ message: "failed to retrive item" });
  }
});

app.post("/items", async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8").catch(() => []);
    const items = JSON.parse(data);

    const newItem = req.body;
    items.push(newItem);
    await fs.writeFile(DATA_FILE, JSON.stringify(items));
    return res.status(201).json({ message: "new item created", data: newItem });
  } catch (error) {
    return res.status(500).json({ message: "failed to post new item" });
  }
});

app.put("/items/:id", async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8").catch(() => "[]");
    let items = JSON.parse(data);

    const itemId = Number(req.params.id);
    const index = items.findIndex(item => item.id == itemId);

    if (index === -1) {
      return res.status(404).json({ message: "Item not found" });
    }

    items[index] = { ...items[index], ...req.body };
    await fs.writeFile(DATA_FILE, JSON.stringify(items));

    res.status(200).json({ message: "Item updated successfully", data: items[index] });
  } catch (error) {
    res.status(500).json({ message: "Failed to update item" });
  }
});


app.delete("/items/:id", async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8").catch(() => []);
    let items = JSON.parse(data);

    const itemId = req.body.id;
    const initialLength = items.length;

    items = items.filter((item) => item.id != itemId);
    if (items.length === initialLength) {
      return res.status(404).json({ message: "Item not found" });
    }
    await fs.writeFile(DATA_FILE, JSON.stringify(items));
    res.status(200).json({ message: "items deleted successful" });
  } catch (error) {
    res.status(500).json({ message: "failed to delete this item" });
  }
});
app.listen(3000, () => {
  console.log("server is running well");
});
