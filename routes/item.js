const router = require("express").Router();


const {
  allItems,
  createItem,
  updateItem,
  deleteItem
} = require("../controllers/item");

router

  .get("/", allItems)
  .post("/new", createItem)
  .post(":id/edit", updateItem)
  .post(":id/delete", deleteItem)

module.exports = router;