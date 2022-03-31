const pool = require("../config/db");
const { use } = require("../utils/utils");

// @desc    Get user notes
// @route   GET notes
// @access  Private
const getAllNotes = use(async (req, res) => {
  try {
    //Get user using the id in the JWT
    const { user_id } = req.user.rows[0];
    // console.log(user_id);
    const user = await pool.query(
      "SELECT u.user_name, n.note_id, n.title, n.content , n.favorites FROM users AS u LEFT JOIN notes AS n ON u.user_id = n.user_id WHERE u.user_id = $1",
      [user_id]
    );

    res.status(200);
    res.json(user.rows);
  } catch (error) {
    console.error(error);
    res.status(401);
    throw new Error("User not authorized");
  }
});

// @desc    Create new note
// @route   GET notes
// @access  Private
const createNote = use(async (req, res) => {
  try {
    //Get user using the id in the JWT
    const { user_id } = req.user.rows[0];
    // console.log(user_id);
    const { title, content } = req.body;
    const newNote = await pool.query(
      "INSERT INTO notes (user_id, title, content) VALUES ($1, $2, $3) RETURNING *",
      [user_id, title, content]
    );

    res.status(201);
    res.json(newNote.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(401);
    throw new Error("User not authorized");
  }
});

// @desc    Update user note
// @route   PUT /notes/:id
// @access  Private
const updateNote = use(async (req, res) => {
  try {
    const { id } = req.params;
    //Get user using the id in the JWT
    const { user_id } = req.user.rows[0];
    const { title, content, favorites } = req.body;

    const updatedNote = await pool.query(
      "UPDATE notes SET title = $1, content = $2, favorites = $3 WHERE note_id = $4 AND user_id = $5  RETURNING *",
      [title, content, favorites, id, user_id]
    );

    res.status(200).json(updatedNote.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(401);
    throw new Error("User not authorized");
  }
});

// @desc    Delete user note
// @route   DELETE /notes/:id
// @access  Private
const deleteNote = use(async (req, res) => {
  try {
    //
    const { id } = req.params;
    //Get user using the id in the JWT
    const { user_id } = req.user.rows[0];

    //delete note
    const deletedNote = await pool.query(
      "DELETE FROM notes where note_id = $1 AND user_id = $2 RETURNING *",
      [id, user_id]
    );

    //check for deleted note
    if (!deletedNote) {
      res.status(404);
      throw new Error("Note not found");
    }

    if (deletedNote.rows[0].user_id.toString() !== user_id) {
      res.status(401);
      throw new Error("Not authorized");
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(401);
    throw new Error("User not authorized");
  }
});

module.exports = { getAllNotes, createNote, updateNote, deleteNote };
