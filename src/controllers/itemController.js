import * as itemService from "../services/itemService.js";

export const getItems = async (req, res, next) => {
  try {
    const items = await itemService.getItems();
    res.status(200).json({ message: "Data retrieved successfully", data: items });
  } catch (err) {
    next(err);
  }
};

export const createItem = async (req, res, next) => {
  try {
    const newItem = await itemService.createItem(req.body);
    res.status(201).json({ message: "New item created", data: newItem });
  } catch (err) {
    next(err);
  }
};

export const updateItem = async (req, res, next) => {
  try {
    const updatedItem = await itemService.updateItem(Number(req.params.id), req.body);
    if (!updatedItem) {
      const error = new Error("Item not found");
      error.status = 404;
      throw error;
    }
    res.status(200).json({ message: "Item updated successfully", data: updatedItem });
  } catch (err) {
    next(err);
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    const deleted = await itemService.deleteItem(Number(req.params.id));
    if (!deleted) {
      const error = new Error("Item not found");
      error.status = 404;
      throw error;
    }
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    next(err);
  }
};
