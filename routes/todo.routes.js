const express = require("express");
const router = express.Router();

const {
  createTodo,
  listAllTodos,
  updateTodo,
  deleteTodo,
  findOneTodo,
} = require("../services/todo");
const { protect } = require("../services/user");

router.use(protect);

// @route   POST /api/v1/todos
// @desc    Create a new todo
router.post("/", createTodo);

// @route   GET /api/v1/todos
// @desc    Get all todos
router.get("/", listAllTodos);

// @route   GET /api/v1/todos/id
// @desc    Get one todo
router.get("/:id", findOneTodo);

// @route   PUT /api/v1/todos/:id
// @desc    Update a todo by ID
router.put("/:id", updateTodo);

// @route   DELETE /api/v1/todos/:id
// @desc    Delete a todo by ID
router.delete("/:id", deleteTodo);

module.exports = router;
