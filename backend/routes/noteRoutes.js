const express = require("express");
const router = express.Router();
const {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getAllNotes).post(protect, createNote);

router.route("/:id").put(protect, updateNote).delete(protect, deleteNote);
module.exports = router;
