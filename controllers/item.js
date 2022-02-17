const Item = require("../models/item");
const mongoose = require("mongoose");

function isObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// display all items
async function allItems(req, res) {
  try {
    const items = await Recipe.find()
    res.status(200).json(items).end();
  } catch (err) {
    res.status(400).json(err.message).end();
  }
}


//  creates the item
async function createItem(req, res) {
  try {
    const item = await Item.create(req.body);
    res.status(200).json(item).end();
  } catch (err) {
    res.status(400).json(err.message).end();
  }
}

// updates a item by its id
async function updateItem(req, res) {
  try {
    const { id } = req.params;
    if (!isObjectId(id)) {
      res.status(400).json("Id not valid").end();
    }
    const item = await Item.findByIdAndUpdate(id, req.body, {
      new: true,
    }).lean();

    res.status(200).json(item).end();
  } catch (err) {
    res.status(400).json(err.message).end();
  }
}

// deletes a task by its id
async function deleteItem(req, res) {
  try {
    const { id } = req.params;
    if (!isObjectId(id)) {
      res.status(400).json("Id not valid").end();
    }
    const item = await Item.findByIdAndDelete(id).lean();
    res.status(200).json(recipe).end();
  } catch (err) {
    res.status(400).json(err.message).end();
  }
}

module.exports = {
    allItems,
    createItem,
    updateItem,
    deleteItem
};